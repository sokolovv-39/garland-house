"use client";

import {
  api,
  ApiLoginType,
  IDBContext,
  isLocalAuth,
  isServerAvailable,
  LoadingPage,
  Logo,
} from "@/fsd/shared";
import classes from "./page.module.scss";
import { SignIn } from "@/fsd/widgets";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const [isShow, setIsShow] = useState(false);
  const router = useRouter();
  const idb = useContext(IDBContext);
  const mutation = useMutation({
    mutationFn: async () => {
      if (!(await isServerAvailable())) {
        const lastLogin = localStorage.getItem("lastLogin");
        if (lastLogin) {
          if (isLocalAuth(lastLogin)) {
            router.push("/orders");
          } else setIsShow(true);
        } else setIsShow(true);
      } else {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const res = await api.post("/auth/refreshtoken", refreshToken, {
            headers: {
              "Content-Type": "application/json-patch+json",
            },
          });
          if (res.status !== 200) {
            setIsShow(true);
          } else {
            return (await res.data) as ApiLoginType;
          }
        } else setIsShow(true);
      }
    },
    onSuccess: (data) => {
      if (data) {
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("lastLogin", Date.now().toString());
        localStorage.setItem("accessToken", data.accessToken);
        router.push("/orders");
      }
    },
    onError: async () => {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("lastLogin");
      localStorage.removeItem("accessToken");
      await idb?.users.deleteCurrentUser();
      setIsShow(true);
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, []);

  return (
    <div className={classes.wrapper}>
      {isShow ? (
        <>
          <Logo />
          <SignIn />
        </>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
}
