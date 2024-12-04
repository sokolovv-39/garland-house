import { Header } from "@/fsd/widgets/Header/ui/Header";
import React from "react";
import classes from "./layout.module.scss";

export default function WithHeader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={classes.wrapper}>
      <Header />
      <>{children}</>
    </div>
  );
}
