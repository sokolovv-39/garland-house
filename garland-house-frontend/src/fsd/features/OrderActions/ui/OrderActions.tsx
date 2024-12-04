"use client";

import { useMutation } from "@tanstack/react-query";
import { IndexedDB } from "../../IndexedDB";
import { generateEstimate, generateRFP } from "../lib";
import classes from "./OrderActions.module.scss";
import {
  api,
  Button,
  deleteOrderRequest,
  isServerAvailable,
  offlineStore,
  saveOrderRequest,
} from "@/fsd/shared";
import { useRouter } from "nextjs-toploader/app";
import { deleteLocalOrder, OrderType } from "@/fsd/entities";
import { observer } from "mobx-react-lite";
import { forwardRef, Ref, useState } from "react";

export const OrderActions = observer(
  forwardRef(function OrderActions(
    { orderId, idb }: { orderId: number; idb: IndexedDB },
    ref: Ref<HTMLDivElement>
  ) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isGenRFP, setIsGenRFP] = useState(false);
    const [isGenEstimate, setIsGenEstimate] = useState(false);
    const router = useRouter();
    const { mutateAsync: deleteOrderMutation } = useMutation({
      mutationFn: (backendId: number) => deleteOrderRequest(backendId),
      retry: false,
    });

    async function deleteOrder() {
      setIsDeleting(true);
      const backendId = (await idb.orders.get(orderId)).backendId;
      await deleteLocalOrder(orderId, idb);
      if ((await isServerAvailable()) && backendId)
        await deleteOrderMutation(backendId);
      router.push("/orders");
    }

    async function getRFP() {
      setIsGenRFP(true);
      const favMeasure = (await idb.measures.getOwn(orderId)).find(
        (measure) => measure.isFavourite
      );
      if (favMeasure) {
        await generateRFP(idb, favMeasure.id);
      }
      setIsGenRFP(false);
    }

    async function getEstimate() {
      setIsGenEstimate(true);
      await generateEstimate(idb, orderId);
      setIsGenEstimate(false);
    }

    return (
      <div className={classes.wrapper} ref={ref}>
        <div className={classes.download}>
          <Button
            isLoading={isGenRFP}
            spinnerColor="#C59B68"
            mode="beige"
            click={getRFP}
            type="button"
            style={{
              width: 106,
              height: 40,
            }}
          >
            Скачать КП
          </Button>
          <Button
            isLoading={isGenEstimate}
            spinnerColor="#C59B68"
            mode="beige"
            click={getEstimate}
            type="button"
            style={{
              width: 126,
              height: 40,
            }}
          >
            Скачать смету
          </Button>
        </div>
        <Button
          spinnerColor="#F12F2F"
          isLoading={isDeleting}
          mode="red"
          click={deleteOrder}
          type="button"
          style={{
            width: 124,
            height: 40,
          }}
        >
          Удалить заказ
        </Button>
      </div>
    );
  })
);
