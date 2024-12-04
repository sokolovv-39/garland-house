"use client";

import {
  AuthGuard,
  getUsersRequest,
  IDBContext,
  LoadingPage,
} from "@/fsd/shared";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <UsersBoundary>{children}</UsersBoundary>
    </AuthGuard>
  );
}

function UsersBoundary({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const idb = useContext(IDBContext);
  const [status, setStatus] = useState<"Success" | "Loading">("Loading");
  const {
    data: users,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: getUsersRequest,
    retry: false,
  });

  useEffect(() => {
    (async function () {
      if (isFetching) setStatus("Loading");
      else {
        if (users) {
          await idb!.users.rewrite(users);
        }
        setStatus("Success");
      }
    })();
  }, [isFetching, isError, users]);

  return (
    <>
      {status === "Loading" ? (
        <div
          style={{
            height: "100vh",
            background:
              "linear-gradient(0deg, #f5f5f5 0%, #f5f5f5 100%), #1a1919",
          }}
        >
          <LoadingPage desc="Загрузка пользователей..." />
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
