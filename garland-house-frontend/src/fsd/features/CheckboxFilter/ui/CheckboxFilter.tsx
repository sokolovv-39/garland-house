"use client";

import { StatusTab } from "@/fsd/shared";
import classes from "./CheckboxFilter.module.scss";
import { useEffect, useRef } from "react";
import { orderStatuses, OrderStatusType } from "@/fsd/entities";

const workersMocks = ["Александр П.", "Сергей А.", "Олег И.", "Антон У."];

export function CheckboxFilter<T>({
  closeFilter,
  type,
  workers,
  onChange,
  checkeds,
}: {
  closeFilter: () => void;
  type: "status" | "workers";
  workers?: {
    fio: string;
    id: number;
  }[];
  onChange?: (status: T, checked: boolean) => void;
  checkeds: Array<T>;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;

    function handleClick(e: MouseEvent) {
      if (el) {
        if (!el.contains(e.target as Node)) {
          e.stopImmediatePropagation();
          closeFilter();
        }
      }
    }

    window.addEventListener("click", handleClick, { capture: true });

    return () => {
      window.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);

  return (
    <div
      className={classes.wrapper}
      ref={wrapperRef}
      onClick={(e) => e.stopPropagation()}
    >
      {type === "status" &&
        orderStatuses.map((status) => {
          let id;
          switch (status) {
            case "Назначен":
              id = "assigned";
              break;
            case "Отменен":
              id = "cancelled";
              break;
            case "Подписан":
              id = "signed";
              break;
            case "Проведен":
              id = "conducted";
              break;
            default:
              id = "";
              break;
          }

          return (
            <div key={status}>
              <input
                type="checkbox"
                id={id}
                checked={checkeds.includes(status as T)}
                onChange={(e) => {
                  if (onChange) {
                    onChange(status as T, e.currentTarget.checked);
                  }
                }}
              />
              <label htmlFor={id}>
                <StatusTab status={status} />
              </label>
            </div>
          );
        })}
      {type === "workers" &&
        workers!.map((worker, index) => (
          <div key={index}>
            <input
              checked={checkeds.includes(worker.id as T)}
              type="checkbox"
              id={worker.id.toString()}
              onChange={(e) => {
                if (onChange) {
                  onChange(worker.id as T, e.currentTarget.checked);
                }
              }}
            />
            <label htmlFor={worker.id.toString()}>
              <span>{worker.fio}</span>
            </label>
          </div>
        ))}
    </div>
  );
}