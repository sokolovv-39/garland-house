"use client";

import { observer } from "mobx-react-lite";
import { validateStore } from "../../lib";
import { PlusSVG } from "../PlusSVG";
import classes from "./Select.module.scss";
import { CSSProperties, useEffect, useState } from "react";
import { UserType } from "@/fsd/entities";

type ValidationTypes = "Менеджер" | "Исполнитель";

const typeToValidKeys: Record<
  ValidationTypes,
  keyof typeof validateStore.validationDetails
> = {
  Менеджер: "isManager",
  Исполнитель: "isExecutor",
};

export const Select = observer(function ({
  type,
  values,
  style,
  variant = "arrow",
  callback,
  initialValue,
  littleType,
  saveType = false,
  entityArr,
  entityCallback,
}: {
  type: string;
  values?: string[];
  style?: CSSProperties;
  variant?: "arrow" | "plus";
  callback?: (val: string) => void;
  initialValue?: string;
  littleType?: boolean;
  saveType?: boolean;
  entityArr?: UserType[];
  entityCallback?: (val: number) => void;
}) {
  const [hover, setHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [checkedValue, setCheckedValue] = useState<string>();
  let isValid = true;
  if (type === "Менеджер" || type === "Исполнитель") {
    const valStoreKey = typeToValidKeys[type];
    isValid = validateStore.validationDetails[valStoreKey];
  }

  useEffect(() => {
    function handleClose(e: MouseEvent) {
      setIsOpen(false);
    }

    window.addEventListener("click", handleClose);

    return () => window.removeEventListener("click", handleClose);
  }, [isOpen]);

  const overviewClass =
    variant === "arrow" ? classes.arrowOverview : classes.plusOverview;

  useEffect(() => {
    if (initialValue) {
      setCheckedValue(initialValue);
    } else setCheckedValue(type);
  }, [initialValue]);

  useEffect(() => {
    if (checkedValue && checkedValue !== type) {
      switch (type) {
        case "Менеджер":
          validateStore.updateValidationDetails({
            isManager: true,
          });
          break;
        case "Исполнитель":
          validateStore.updateValidationDetails({
            isExecutor: true,
          });
          break;
        default:
          break;
      }
    }
  }, [checkedValue]);

  return (
    <div className={classes.wrapper}>
      <div
        className={classes.select}
        style={style}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          className={`${overviewClass} ${isOpen ? classes.overviewOpen : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          {
            <div className={classes.type}>
              {initialValue && littleType && (
                <span className={classes.littleType}>{type}</span>
              )}
              <span>
                {saveType ? type : checkedValue ? checkedValue : type}
              </span>
            </div>
          }
          {variant === "arrow" && (
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.7802 5.96667L9.43355 10.3133C8.92021 10.8267 8.08021 10.8267 7.56688 10.3133L3.22021 5.96667"
                stroke={isOpen ? "#C59B68" : "#191919"}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {variant === "plus" && <PlusSVG hovered={hover} />}
        </div>
        {isOpen && values && (
          <ul className={classes.variants}>
            {values.map((val, i) => {
              if (val !== checkedValue || saveType) {
                return (
                  <li
                    key={i}
                    onClick={() => {
                      if (callback) {
                        callback(val);
                      }
                    }}
                  >
                    {val}
                  </li>
                );
              }
            })}
          </ul>
        )}
        {isOpen && entityArr && (
          <ul className={classes.variants}>
            {entityArr.map((val, i) => {
              if (val.fio !== checkedValue || saveType) {
                return (
                  <li
                    key={i}
                    onClick={() => {
                      if (entityCallback) {
                        entityCallback(val.id);
                      }
                    }}
                  >
                    {val.fio}
                  </li>
                );
              }
            })}
          </ul>
        )}
      </div>
      {!isValid && (
        <p className={classes.validate}>Поле обязательно для заполнения</p>
      )}
    </div>
  );
});
