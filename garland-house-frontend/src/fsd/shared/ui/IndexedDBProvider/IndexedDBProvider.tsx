"use client";

import { IndexedDB } from "@/fsd/features";
import { useEffect, useState } from "react";
import { IDBContext } from "../../lib";
import classes from "./IndexedDBProvider.module.scss";
import { LoadingPage } from "../LoadingPage";
import { ErrorPage } from "../ErrorPage";

export function IndexedDBProvider({ children }: { children: React.ReactNode }) {
  const [DBInit, setDBInit] = useState<
    "success" | "pending" | "error" | "deleting"
  >("pending");
  const [DB, setDB] = useState<IndexedDB | null>(null);
  const db = new IndexedDB();

  function clearDB() {
    setDBInit("deleting");
    db.idbDelete().catch((err) => {
      setDBInit("error");
      console.error(err);
    });
  }

  useEffect(() => {
    db.idbInit()
      .then(() => {
        setDB(db);
        setDBInit("success");
      })
      .catch((error) => {
        console.error(error);
        setDBInit("error");
      });
  }, []);

  return (
    <>
      {DBInit === "success" && (
        <>
          <IDBContext.Provider value={DB}>{children}</IDBContext.Provider>
          {process.env.NODE_ENV === "development" && (
            <button className={classes.wrapper} onClick={clearDB}>
              <h4>Очистить базу данных</h4>
              <span>dev</span>
            </button>
          )}
        </>
      )}
      {DBInit === "pending" && (
        <div
          style={{
            height: "100vh",
            background:
              "linear-gradient(0deg, #f5f5f5 0%, #f5f5f5 100%), #1a1919",
          }}
        >
          <LoadingPage desc="Инициализация базы данных..." />
        </div>
      )}
      {DBInit === "error" && (
        <div
          style={{
            height: "100vh",
            background:
              "linear-gradient(0deg, #f5f5f5 0%, #f5f5f5 100%), #1a1919",
          }}
        >
          <ErrorPage text="Ошибка доступа к базе данных" />
        </div>
      )}
      {DBInit === "deleting" && (
        <div
          style={{
            height: "100vh",
            background:
              "linear-gradient(0deg, #f5f5f5 0%, #f5f5f5 100%), #1a1919",
          }}
        >
          <LoadingPage desc="Инициализация базы данных..." />
        </div>
      )}
    </>
  );
}
