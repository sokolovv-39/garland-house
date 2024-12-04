"use client";

import Image from "next/image";
import classes from "./MediaList.module.scss";
import { Media } from "../Media/Media";
import { AddMedia } from "../AddMedia";
import { FileTypeEnum } from "../../model";
import { Spinner } from "@/fsd/shared";
import { useEffect } from "react";

export function MediaList({
  urls,
  callback,
  deleteMedia,
  mediaHeight,
  mediaWidth,
  type,
  orderId,
  loadQuantity,
}: {
  urls: string[];
  callback: (files: FileList) => void;
  deleteMedia: (delUrl: string) => void;
  mediaWidth?: number;
  mediaHeight?: number;
  type?: string;
  orderId?: number;
  loadQuantity: number;
}) {
  return (
    <div className={classes.box}>
      {type && <h5>{type}</h5>}
      <div className={classes.wrapper}>
        {urls.map((url, i) => (
          <Media
            orderId={orderId}
            src={url}
            key={i}
            deleteMedia={deleteMedia}
            mediaHeight={mediaHeight}
            mediaWidth={mediaWidth}
          />
        ))}
        {[...Array(loadQuantity)].map((_, index) => (
          <div
            className={classes.spinner}
            key={index}
            style={{
              width: mediaWidth,
              height: mediaHeight,
            }}
          >
            <Spinner color="#c59b68" width={48} height={48} />
          </div>
        ))}
        <AddMedia callback={callback} width={mediaWidth} height={mediaHeight} />
      </div>
    </div>
  );
}
