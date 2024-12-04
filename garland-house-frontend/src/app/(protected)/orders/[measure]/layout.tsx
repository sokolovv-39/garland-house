"use client";

import { deleteLocalOrder } from "@/fsd/entities";
import { generateRFP } from "@/fsd/features/OrderActions/lib";
import {
  apiOrderToLocal,
  ErrorPage,
  getOrderRequest,
  IDBContext,
  LoadingPage,
  offlineStore,
  validateStore,
} from "@/fsd/shared";
import { ResultOrderDto } from "@/fsd/shared/api/apiTypes";
import { MeasureControl } from "@/fsd/widgets";
import { useQuery } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";

export default observer(function MeasureLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    measure: string;
  };
}>) {
  const idb = useContext(IDBContext);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const { isError, isFetching, refetch } = useQuery({
    queryKey: ["getOrder"],
    queryFn: async () => {
      const remoteOrder = await getOrderRequest(+params.measure);
      return remoteOrder;
    },
    enabled: false,
  });

  useEffect(() => {
    (async function () {
      const order = await idb?.orders.get(+params.measure);
      if (!order) {
        const { data } = await refetch();
        if (data) {
          await apiOrderToLocal(data, idb!);
          setIsDataLoaded(true);
        }
      } else {
        setIsDataLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    return () => {
      validateStore.resetValidationDetails();
    };
  });

  if (isFetching) {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      >
        <LoadingPage desc="Загрузка заказа..." />
      </div>
    );
  } else if (isError) {
    return (
      <div
        style={{
          height: "100vh",
          background:
            "linear-gradient(0deg, #f5f5f5 0%, #f5f5f5 100%), #1a1919",
        }}
      >
        <ErrorPage />
      </div>
    );
  } else if (isDataLoaded) {
    return (
      <div>
        <MeasureControl orderId={params.measure} />
        {children}
      </div>
    );
  } else return <></>;
});
