"use client";

import {
  api,
  Button,
  saveOrderRequest,
  enumToApi,
  IDBContext,
  isServerAvailable,
  Spinner,
  validateStore,
} from "@/fsd/shared";
import classes from "./MeasureControl.module.scss";
import ArrowLeft from "./images/arrow-left.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { useMutation } from "@tanstack/react-query";
import { deleteLocalOrder } from "@/fsd/entities";
import { observer } from "mobx-react-lite";
import { reaction } from "mobx";

export const MeasureControl = observer(function ({
  orderId,
}: {
  orderId: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const idb = useContext(IDBContext);
  const [isSaving, setIsSaving] = useState(false);
  const { mutateAsync: saveOrderMutate } = useMutation({
    mutationFn: () => saveOrderRequest(+orderId, idb!),
    retry: false,
  });

  async function saveOrder() {
    setIsSaving(true);
    const isValidVal = await validateStore.validate(idb!, +orderId);
    if (isValidVal) {
      const order = await idb?.orders.get(+orderId);
      if (await isServerAvailable()) {
        if (order?.isEdited) {
          await saveOrderMutate();
        }
        await deleteLocalOrder(+orderId, idb!);
      }
      router.push("/orders");
    }
    setIsSaving(false);
  }

  return (
    <div className={classes.wrapper}>
      <Link className={classes.order} href="/orders">
        <Image src={ArrowLeft} alt="" />
        <h2>Заказ №{orderId}</h2>
      </Link>
      <div className={classes.pages}>
        <Link
          href={`/orders/${orderId}/basic`}
          className={`${classes.link} ${
            pathname.includes("/basic") ? classes.activeLink : ""
          }`}
        >
          <span className={classes.number}>1</span>
          <span>Базовая информация</span>
        </Link>
        <Link
          href={`/orders/${orderId}/objects`}
          className={`${classes.link} ${
            pathname.includes("/objects") ? classes.activeLink : ""
          }`}
        >
          <span className={classes.number}>2</span>
          <span>Все объекты</span>
        </Link>
        <Link
          href={`/orders/${orderId}/report`}
          className={`${classes.link} ${
            pathname.includes("/report") ? classes.activeLink : ""
          }`}
        >
          <span className={classes.number}>3</span>
          <span>Отчет</span>
        </Link>
      </div>
      {Object.values(validateStore.validationDetails).every((v) => v) ? (
        <Button
          isLoading={isSaving}
          click={saveOrder}
          type="button"
          style={{
            height: "40px",
            width: "178px",
          }}
        >
          Сохранить и закрыть
        </Button>
      ) : (
        <Button
          type="button"
          mode="red"
          style={{
            height: "40px",
            width: "178px",
          }}
        >
          Обязательные поля не заполнены
        </Button>
      )}
    </div>
  );
});
