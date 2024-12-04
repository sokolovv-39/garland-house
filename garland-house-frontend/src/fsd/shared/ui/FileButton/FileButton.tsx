"use client";

import Image, { StaticImageData } from "next/image";
import classes from "./FileButton.module.scss";
import { FileTypeEnum } from "@/fsd/entities";
import React, { CSSProperties, useContext, useEffect, useState } from "react";
import Unknown_Icon from "./assets/Unknown_Icon.avif";
import { IDBContext } from "../../lib";

export function FileButton({
  fileType,
  src,
  orderId,
}: {
  fileType: FileTypeEnum;
  src: string;
  orderId?: number;
}) {
  const idb = useContext(IDBContext);
  const [file, setFile] = useState<StaticImageData>(Unknown_Icon);
  const [fileName, setFileName] = useState("");
  const [styles, setStyles] = useState<CSSProperties>({
    width: 81,
    height: 100,
  });

  const pdfStyles: CSSProperties = {
    ...styles,
    boxSizing: "content-box",
    paddingTop: 16,
    height: 70,
    width: 64,
  };

  const unknownStyles: CSSProperties = {
    ...styles,
    width: 98,
    marginTop: 8,
    height: 92,
  };

  useEffect(() => {
    (async function () {
      if (fileType === FileTypeEnum.Pdf) {
        const icon = (await import("./assets/PDF_Icon.webp")).default;
        setStyles(pdfStyles);
        setFile(icon);
      } else if (fileType === FileTypeEnum.MS_Word) {
        const icon = (await import("./assets/Word_Icon.webp")).default;
        setFile(icon);
      } else if (fileType === FileTypeEnum.MS_Excel) {
        const icon = (await import("./assets/Excel_Icon.webp")).default;
        setFile(icon);
      } else {
        setStyles(unknownStyles);
      }
    })();
  }, [fileType]);

  useEffect(() => {
    (async function () {
      if (orderId && src) {
        const order = await idb!.orders.get(orderId);
        const fileName = order.reports.find(
          (report) => report.path === src
        )!.fileName;
        setFileName(fileName);
      }
    })();
  }, [orderId, src]);
  return (
    <a
      className={classes.wrapper}
      href={src}
      download={fileName}
      target="_blank"
    >
      <Image src={file} alt="" style={styles} />
      <span>{fileName}</span>
    </a>
  );
}

/* height: 67px;
    width: 56px; */
