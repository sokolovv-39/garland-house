"use client";

import { default as NextImage } from "next/image";
import classes from "./Media.module.scss";
import {
  CloseSVG,
  FileButton,
  getFileType,
  Spinner,
  VideoPlayer,
} from "@/fsd/shared";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { FileTypeEnum } from "../../model";

const imageBigHeight = 670;

export function Media({
  src,
  deleteMedia,
  mediaHeight = 72,
  mediaWidth = 119,
  isModal = true,
  orderId,
  specFileType,
}: {
  src: string;
  deleteMedia: (delUrl: string) => void;
  mediaWidth?: number;
  mediaHeight?: number;
  isModal?: boolean;
  orderId?: number;
  specFileType?: FileTypeEnum;
}) {
  const [isLoadSmallPhoto, setIsLoadSmallPhoto] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [photoWidth, setPhotoWidth] = useState(0);
  const [imageBigWidth, setImageBigWidth] = useState(0);
  let fileType = null;
  if (!specFileType) {
    fileType = getFileType(src);
  } else fileType = specFileType;
  const isPhotoVideo = [FileTypeEnum.Photo, FileTypeEnum.Video].includes(
    fileType
  );

  useEffect(() => {
    let fileType = null;
    if (!specFileType) {
      fileType = getFileType(src);
    } else fileType = specFileType;
    const isPhoto = [FileTypeEnum.Photo].includes(fileType);
    if (isPhoto) {
      const img = new Image();
      img.onload = () => {
        const ratio = img.width / img.height;
        setPhotoWidth(mediaHeight * ratio);
        setImageBigWidth(imageBigHeight * ratio);
      };
      img.src = src;
    }
  }, [src, specFileType]);

  return (
    <div className={classes.wrapper}>
      <Modal
        ariaHideApp={false}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          overlay: {
            background: "rgba(25, 25, 25, 0.36)",
          },
          content: {
            padding: "0",
            width: "min-content",
            height: "min-content",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <svg
          onClick={() => setIsOpen(false)}
          style={{
            position: "absolute",
            right: "24px",
            top: "18px",
            cursor: "pointer",
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
        >
          <rect width="48" height="48" fill="#191919" fill-opacity="0.5" />
          <path
            d="M15.5625 33.4333L34.4292 14.5667"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M34.4292 33.4333L15.5625 14.5667"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <NextImage
          style={{
            display: "block",
          }}
          src={src}
          alt=""
          width={imageBigWidth}
          height={imageBigHeight}
          unoptimized
        />
      </Modal>
      {fileType === FileTypeEnum.Photo ? (
        <>
          {isLoadSmallPhoto && (
            <div className={classes.spinner}>
              <Spinner color="#c59b68" width={48} height={48} />
            </div>
          )}
          <NextImage
            onClick={() => {
              if (isModal) setIsOpen(true);
            }}
            src={src}
            alt=""
            width={photoWidth}
            height={mediaHeight}
            className={classes.image}
            style={{
              display: isLoadSmallPhoto ? "none" : "block",
            }}
            onLoad={() => {
              setIsLoadSmallPhoto(false);
            }}
            unoptimized
          />
        </>
      ) : fileType === FileTypeEnum.Video ? (
        <VideoPlayer
          src={src}
          mediaHeight={mediaHeight}
          mediaWidth={mediaWidth}
        />
      ) : (
        <FileButton fileType={fileType} src={src} orderId={orderId} />
      )}
      <CloseSVG
        photo={isPhotoVideo}
        style={{
          position: "absolute",
          top: isPhotoVideo ? 4 : -1,
          right: isPhotoVideo ? 4 : 0,
        }}
        onClick={() => deleteMedia(src)}
      />
    </div>
  );
}
