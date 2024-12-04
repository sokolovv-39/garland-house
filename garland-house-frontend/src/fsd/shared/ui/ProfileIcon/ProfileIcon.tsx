"use client";

import { CSSProperties, useState } from "react";
import classes from "./ProfileIcon.module.scss";

export function ProfileIcon({
  name,
  customStyles,
}: {
  name: string;
  customStyles?: CSSProperties;
}) {
  const splitted = name.split(" ");
  let firstLetters = "";
  if (splitted[0][0] && splitted[1][0])
    firstLetters = splitted[0][0] + splitted[1][0];

  return (
    <div className={classes.wrapper} style={customStyles}>
      {firstLetters}
    </div>
  );
}
