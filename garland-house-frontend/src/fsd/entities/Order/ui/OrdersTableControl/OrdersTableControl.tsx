"use client";

import {
  api,
  Button,
  DateFormatter,
  getOrdersTable,
  IDBContext,
  Input,
  offlineStore,
} from "@/fsd/shared";
import classes from "./OrdersTableControl.module.scss";
import Refresh from "./images/refresh.svg";
import Image from "next/image";
import { CSSProperties, useContext, useEffect, useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { defaultOrder, OrderType } from "../../model";
import { nanoid } from "nanoid";
import {
  UseMutateAsyncFunction,
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { observer } from "mobx-react-lite";

type SyncTextType =
  | "Данные не синхронизированы"
  | "Синхронизировано"
  | "Загрузка...";

const syncStyles: {
  noSync: CSSProperties;
  sync: CSSProperties;
  pending: CSSProperties;
} = {
  noSync: {
    color: "#8C1B1B",
    border: "1px solid rgba(241, 47, 47, 0.10)",
    background: "rgba(241, 47, 47, 0.10)",
    lineHeight: "100%",
    padding: "13px 16px",
    width: "240px",
  },
  sync: {
    color: "#1B8C1F",
    border: "1px solid rgba(47, 241, 53, 0.12)",
    background: "rgba(47, 241, 53, 0.12)",
    lineHeight: "100%",
    padding: "13px 16px",
    width: "240px",
  },
  pending: {
    color: "#8C6E1B",
    border: "1px solid rgba(241, 194, 47, 0.10)",
    background: "rgba(241, 194, 47, 0.15)",
    lineHeight: "100%",
    padding: "13px 16px",
    width: "240px",
  },
};

export const OrdersTableControl = observer(function ({
  searchCallback,
  searchVal,
}: {
  searchCallback: (val: string) => void;
  searchVal: string;
}) {
  const idb = useContext(IDBContext);
  const {
    isFetching: isFetchingOrders,
    isError: isErrorOrders,
    data: ordersTable,
  } = useQuery({
    queryKey: ["getOrdersTable"],
    queryFn: () => getOrdersTable(idb!),
    enabled: false,
  });
  const queryClient = useQueryClient();
  const [syncStyle, setSyncStyle] = useState<CSSProperties>(syncStyles.noSync);
  const [sync, setSync] = useState<SyncTextType>("Данные не синхронизированы");
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);

  async function addOrder() {
    setIsAdding(true);
    const newOrder: OrderType = {
      ...defaultOrder,
      id: nanoid(),
      measureDate: new DateFormatter(new Date()).dateToDMY(),
    };
    if (!offlineStore.offlineMode.isOfflineMode) {
      let lastOrderId = 0;
      if (ordersTable && ordersTable.length) {
        lastOrderId = Math.max(...ordersTable!.map((order) => order.id)) + 1;
      } else {
        lastOrderId = 1;
      }
      newOrder.numberOfOrder = lastOrderId;
      await idb!.orders.add(newOrder);
      router.push(`orders/${newOrder.numberOfOrder}/basic`);
    } else {
      const orders = (await idb?.orders.getAll()) || [];
      let lastOrderId = 0;
      if (orders.length) {
        lastOrderId =
          Math.max(...orders!.map((order) => order.numberOfOrder)) + 1;
      } else {
        lastOrderId = 1;
      }
      newOrder.numberOfOrder = lastOrderId;
      await idb!.orders.add(newOrder);
      router.push(`orders/${newOrder.numberOfOrder}/basic`);
    }
  }

  function updateOrders() {
    queryClient.invalidateQueries({
      queryKey: ["getOrdersTable"],
    });
  }

  useEffect(() => {
    if (isFetchingOrders) {
      setSync("Загрузка...");
      setSyncStyle(syncStyles.pending);
    } else if (isErrorOrders) {
      setSync("Данные не синхронизированы");
      setSyncStyle(syncStyles.noSync);
    } else {
      setSync("Синхронизировано");
      setSyncStyle(syncStyles.sync);
    }
  }, [isErrorOrders, isFetchingOrders]);

  return (
    <div className={classes.wrapper}>
      <Input
        type="search"
        placeholder="Поиск по номеру, адресу или имени"
        searchStyle={{
          flex: "1 0 auto",
        }}
        onChange={searchCallback}
        initialValue={searchVal}
      />
      <div className={classes.sync}>
        <Button
          style={{
            background: "rgba(197, 155, 104, 0.12)",
            paddingTop: "8px",
            paddingBottom: "8px",
          }}
          click={updateOrders}
        >
          <Image
            src={Refresh}
            alt=""
            className={isFetchingOrders ? classes.spin : ""}
          />
        </Button>
        <Button style={syncStyle}>{sync}</Button>
      </div>
      <Button
        click={addOrder}
        isLoading={isAdding}
        style={{
          width: 143.54,
          height: 40,
        }}
      >
        Добавить замер
      </Button>
    </div>
  );
});
