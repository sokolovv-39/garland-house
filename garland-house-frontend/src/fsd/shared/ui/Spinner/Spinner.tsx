import { CSSProperties } from "react";
import classes from "./Spinner.module.scss";

export function Spinner({
  color = "#fff",
  width = 25,
  height = 25,
}: {
  color?: CSSProperties["color"];
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
}) {
  return (
    <span
      className={classes.loader}
      style={{
        borderColor: color,
        borderBottomColor: "transparent",
        width,
        height,
      }}
    ></span>
  );
}
