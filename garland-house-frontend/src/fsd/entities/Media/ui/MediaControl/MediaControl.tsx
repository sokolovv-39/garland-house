"use client";

import {
  IDBContext,
  PlusSVG,
  baseURL,
  deleteFileRequest,
  fileToBase64,
  getOrderRequest,
  localOrderToApi,
  saveOrderRequest,
  uploadFileRequest,
} from "@/fsd/shared";
import classes from "./MediaControl.module.scss";
import { useContext, useEffect, useState } from "react";
import { MediaList } from "../MediaList";
import { uploadMedia } from "../../lib";
import { useMutation } from "@tanstack/react-query";
import { FileTypeEnum, MediaTypeEnum } from "../../model";
import { ObjectType } from "@/fsd/entities/Object";
import { markOrderAsEdited } from "@/fsd/entities/Order";

export function MediaControl({
  type,
  objectId,
  orderId,
}: {
  type: MediaTypeEnum;
  orderId: number;
  objectId: string;
}) {
  const [isShowMediaList, setIsShowMediaList] = useState(false);
  const [loadQuantity, setLoadQuantity] = useState(0);
  const idb = useContext(IDBContext);
  const [hover, setHover] = useState(false);
  const [mediaURLs, setMediaURLs] = useState<string[]>([]);
  const [text, setText] = useState("");
  const { mutate: uploadMediaToServer } = useMutation({
    mutationFn: (files: FileList) => addMedia(files),
    onError: (error) => {
      console.error(error);
    },
  });
  const { mutate: deleteFileMutation } = useMutation({
    mutationFn: (fileId: number) => deleteFileRequest(fileId),
  });

  async function addMedia(files: FileList) {
    setLoadQuantity((prev) => prev + files.length);
    await Promise.all(
      Array.from(files).map(async (file) => {
        const media = await uploadFileRequest(file);
        const absolutePath = `${baseURL}/${media.path}`;
        setMediaURLs((prev) => {
          return [...prev, absolutePath];
        });
        setLoadQuantity((prev) => prev - 1);
        const object = await idb!.objects.get(objectId);
        await idb?.objects.update({
          ...object,
          media: [
            ...object.media,
            {
              typeEnum: type,
              fileEntityId: media.id,
              path: absolutePath,
            },
          ],
        });
      })
    );
    await markOrderAsEdited(idb!, orderId);
  }

  async function deleteMedia(src: string) {
    const object = await idb!.objects.get(objectId);
    const deletedMedia = object.media.find((media) => media.path === src);
    deleteFileMutation(deletedMedia!.fileEntityId);
    const filtMedia = object.media.filter(
      (media) => media.path !== deletedMedia!.path
    );
    await idb!.objects.update({
      ...object,
      media: filtMedia,
    });
    setMediaURLs((prev) => prev.filter((url) => url !== deletedMedia?.path));
  }

  useEffect(() => {
    (async function () {
      const object = await idb!.objects.get(objectId);
      switch (type) {
        case MediaTypeEnum.Photo:
          {
            const urls = object.media
              .filter((mediaObj) => mediaObj.typeEnum === MediaTypeEnum.Photo)
              .map((mediaObj) => mediaObj.path);
            setMediaURLs([...mediaURLs, ...urls]);
            setText("Добавить фото");
          }
          break;
        case MediaTypeEnum.Video:
          {
            const urls = object.media
              .filter((mediaObj) => mediaObj.typeEnum === MediaTypeEnum.Video)
              .map((mediaObj) => mediaObj.path);
            setMediaURLs([...mediaURLs, ...urls]);
            setText("Добавить видео");
          }
          break;
        case MediaTypeEnum.Vizualization:
          {
            const urls = object.media
              .filter(
                (mediaObj) => mediaObj.typeEnum === MediaTypeEnum.Vizualization
              )
              .map((mediaObj) => mediaObj.path);
            setMediaURLs([...mediaURLs, ...urls]);
            setText("Добавить визуализацию");
          }
          break;
        default:
          break;
      }
    })();
  }, [type]);

  useEffect(() => {
    if (mediaURLs.length) setIsShowMediaList(true);
    else setIsShowMediaList(false);
  }, [mediaURLs]);

  return (
    <>
      {!isShowMediaList ? (
        <div
          className={classes.wrapperUpload}
          onMouseEnter={() => {
            if (mediaURLs.length === 0) setHover(true);
          }}
          onMouseLeave={() => setHover(false)}
          onClick={() => {
            uploadMedia()
              .then((files) => {
                setIsShowMediaList(true);
                uploadMediaToServer(files);
              })
              .catch((err) => console.error(err));
          }}
          style={{
            cursor: `${mediaURLs.length === 0 ? "pointer" : "auto"}`,
          }}
        >
          <span className={classes.title}>{text}</span>
          <PlusSVG hovered={hover} disabled={mediaURLs.length > 0} />
        </div>
      ) : (
        <MediaList
          loadQuantity={loadQuantity}
          type={text}
          urls={mediaURLs}
          callback={(files) => uploadMediaToServer(files)}
          deleteMedia={(src) => deleteMedia(src)}
        />
      )}
    </>
  );
}
