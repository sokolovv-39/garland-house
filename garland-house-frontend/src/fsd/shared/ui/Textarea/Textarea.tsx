"use client";

import { useState } from "react";
import classes from "./Textarea.module.scss";

export function Textarea({
  width,
  height,
  littleType,
  onChange,
  initialValue = "",
}: {
  width: number;
  height: number;
  littleType?: string;
  onChange?: (val: string) => void;
  initialValue?: string;
}) {
  const [val, setVal] = useState(initialValue);

  return (
    <div className={classes.wrapper}>
      {val && <span>{littleType}</span>}
      <textarea
        style={{
          paddingTop: val && "26px",
          width,
          height,
        }}
        value={val}
        className={classes.text}
        placeholder={littleType}
        onChange={(e) => {
          setVal(e.currentTarget.value);
          if (onChange) onChange(e.currentTarget.value);
        }}
      />
    </div>
  );
}
