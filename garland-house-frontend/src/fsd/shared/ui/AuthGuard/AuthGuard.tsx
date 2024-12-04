"use client";

import { IDBContext, isLocalAuth } from "../../lib";
import { useRouter } from "nextjs-toploader/app";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api, ApiLoginType, isServerAvailable } from "../../api";
import { UserType } from "@/fsd/entities";

export function AuthGuard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const idb = useContext(IDBContext);
  const router = useRouter();
  const [isGranted, setIsGranted] = useState(false);
  const mutation = useMutation({
    mutationFn: async () => {
      if (!(await isServerAvailable())) {
        const lastLogin = localStorage.getItem("lastLogin");
        if (lastLogin) {
          isLocalAuth(lastLogin) ? setIsGranted(true) : router.push("/");
        } else {
          router.push("/");
        }
      } else {
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await api.post("auth/refreshtoken", refreshToken, {
          headers: {
            "Content-Type": "application/json-patch+json",
          },
        });
        return (await res.data) as ApiLoginType;
      }
    },
    onSuccess: async (data) => {
      if (data) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("lastLogin", Date.now().toString());
        localStorage.setItem("refreshToken", data.refreshToken);
        await idb!.users.setCurrentUser(data.userDto);
        setIsGranted(true);
      }
    },
    onError: async () => {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("lastLogin");
      localStorage.removeItem("accessToken");
      await idb!.users.deleteCurrentUser();
      router.push("/");
    },
  });

  useEffect(() => {
    if (localStorage.getItem("refreshToken")) {
      mutation.mutate();
    } else {
      router.push("/");
      setIsGranted(false);
    }
  }, []);

  return <>{isGranted && <>{children}</>}</>;
}
