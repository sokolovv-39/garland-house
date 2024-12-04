"use client";

import { api, ApiLoginType, Button, IDBContext, Input } from "@/fsd/shared";
import classes from "./SignIn.module.scss";
import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import { observer } from "mobx-react-lite";

function SignInComp() {
  const idb = useContext(IDBContext);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const mutation = useMutation({
    mutationFn: async (form: HTMLFormElement) => {
      setIsLoading(true);
      const formData = new FormData(form);
      const formObj = Object.fromEntries(formData.entries());
      const res = await api.post("/auth/login", formObj);
      const data = (await res.data) as ApiLoginType;
      return data;
    },
    onSuccess: async (res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("lastLogin", Date.now().toString());
      localStorage.setItem("refreshToken", res.refreshToken);
      await idb!.users.setCurrentUser(res.userDto);
      router.push("/orders");
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Вход</h1>
      <form
        className={classes.form}
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate(e.currentTarget);
        }}
      >
        <Input
          onFocus={() => mutation.reset()}
          name="email"
          type="text"
          placeholder="Логин"
          onChange={(val) => setLogin(val)}
          initialValue={login}
        />
        <Input
          onFocus={() => mutation.reset()}
          name="password"
          type="password"
          placeholder="Пароль"
          onChange={(val) => setPassword(val)}
          initialValue={password}
        />
        {mutation.isError && (
          <p className={classes.wrong}>Неправильный логин и/или пароль</p>
        )}
        <Button
          isLoading={isLoading}
          style={{
            padding: "19px 0",
            marginTop: "16px",
            width: "305.4",
            height: "54px",
          }}
        >
          Войти
        </Button>
      </form>
    </div>
  );
}

export const SignIn = observer(SignInComp);
