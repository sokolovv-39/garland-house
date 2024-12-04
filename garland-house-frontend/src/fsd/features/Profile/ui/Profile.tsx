"use client";

import { Button, IDBContext, ProfileIcon } from "@/fsd/shared";
import classes from "./Profile.module.scss";
import { useRouter } from "nextjs-toploader/app";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserType } from "@/fsd/entities";

const nameq = "Игорь Соколов";

export function Profile() {
  const [user, setUser] = useState<UserType>({
    fio: "",
    role: "",
    id: 0,
    email: "",
  });
  const idb = useContext(IDBContext);
  const router = useRouter();

  async function logout() {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("lastLogin");
    localStorage.removeItem("accessToken");
    await idb!.users.deleteCurrentUser();
    router.push("/");
  }

  useEffect(() => {
    (async function () {
      const currentUser = await idb?.users.getCurrentUser();
      setUser(currentUser!);
    })();
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.nameBtn}>
        <p className={classes.name}>
          {user.fio?.split(" ").slice(0, 2).join(" ")}
        </p>
        <Button type="button" mode="noBackground" click={logout}>
          Выйти
        </Button>
      </div>
      <ProfileIcon name={user.fio || ""} />
    </div>
  );
}
