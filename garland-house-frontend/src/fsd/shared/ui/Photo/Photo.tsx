"use client";

import { default as NextImage } from "next/image";
import Modal from "react-modal";
import classes from "./Photo.module.scss";
import {
  deleteGalleryRequest,
  ResultWorkDto,
  updateGalleryRequest,
  uploadFileRequest,
} from "../../api";
import { useEffect, useState } from "react";
import { Button } from "../Button";
import { Textarea } from "../Textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadMedia } from "@/fsd/entities/Media/lib";
import { Spinner } from "../Spinner";

const imgHeight = 220;
const bigImgHeight = 655;

export function Photo({ mediaObj }: { mediaObj: ResultWorkDto }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [photoWidth, setPhotoWidth] = useState(0);
  const [bigPhotoWidth, setBigPhotoWidth] = useState(0);
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(true);

  function openPhoto() {
    setIsOpen(true);
  }

  function closePhoto() {
    setIsOpen(false);
  }

  function openEdit() {
    setIsEdit(true);
  }

  function closeEdit() {
    setIsEdit(false);
  }

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const ratio = img.width / img.height;
      setPhotoWidth(imgHeight * ratio);
      setBigPhotoWidth(bigImgHeight * ratio);
    };
    img.src = mediaObj.path;
  }, [mediaObj.path]);

  return (
    <>
      <div className={classes.wrapper} onClick={openPhoto}>
        <>
          {isLoadingPhoto && (
            <div className={classes.spinner}>
              <Spinner color="#c59b68" width={48} height={48} />
            </div>
          )}
        </>
        <NextImage
          style={{
            display: isLoadingPhoto ? "none" : "block",
          }}
          className={classes.media}
          src={mediaObj.path}
          alt=""
          width={photoWidth}
          height={imgHeight}
          unoptimized
          onLoad={() => setIsLoadingPhoto(false)}
        />
        <div className={classes.desc}>
          <p>{mediaObj.comment}</p>
          <svg
            onClick={(e) => {
              e.stopPropagation();
              openEdit();
            }}
            className={classes.options}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g>
              <path
                stroke="#191919"
                d="M8 12H8.009M12.005 12H12.013M15.991 12H16"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                stroke="#191919"
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                strokeWidth="1.5"
              />
            </g>
          </svg>
        </div>
      </div>
      <Modal
        ariaHideApp={false}
        isOpen={isOpen}
        onRequestClose={closePhoto}
        style={{
          overlay: {
            background: "rgba(25, 25, 25, 0.36)",
          },
          content: {
            padding: "0",
            width: "min-content",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            height: bigImgHeight,
            overflow: "hidden",
          },
        }}
      >
        <svg
          onClick={closePhoto}
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
          <rect width="48" height="48" fill="#191919" fillOpacity="0.5" />
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
          src={mediaObj.path}
          alt=""
          style={{
            display: "block",
          }}
          unoptimized
          width={bigPhotoWidth}
          height={bigImgHeight}
        />
      </Modal>
      <Modal
        ariaHideApp={false}
        isOpen={isEdit}
        onRequestClose={closeEdit}
        style={{
          overlay: {
            background: "rgba(25, 25, 25, 0.36)",
          },
          content: {
            width: "min-content",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            height: "min-content",
            border: "none",
            borderRadius: "16px",
          },
        }}
      >
        <EditModal closeEdit={closeEdit} mediaObj={mediaObj} />
      </Modal>
    </>
  );
}

const editedImgHeight = 136;

function EditModal({
  closeEdit,
  mediaObj,
}: {
  closeEdit: () => void;
  mediaObj: ResultWorkDto;
}) {
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(true);
  const [photoWidth, setPhotoWidth] = useState(0);
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState(mediaObj.path);
  const [file, setFile] = useState<File | null>(null);
  const [comment, setComment] = useState(mediaObj.comment);
  const { isPending: isPendingSave, mutate: saveEdits } = useMutation({
    mutationFn: async () => {
      if (!file) {
        await updateGalleryRequest({
          id: mediaObj.id,
          comment: comment,
          fileEntityId: mediaObj.fileEntityId,
        });
      } else if (file) {
        const media = await uploadFileRequest(file);
        await updateGalleryRequest({
          id: mediaObj.id,
          comment,
          fileEntityId: media.id,
        });
      }
      queryClient.invalidateQueries({
        queryKey: ["getGallery"],
      });
    },
    onSuccess: () => {
      closeEdit();
    },
  });
  const { mutate: deleteWork, isPending: isPendingDelete } = useMutation({
    mutationFn: async () => {
      await deleteGalleryRequest(mediaObj.id);
      queryClient.invalidateQueries({
        queryKey: ["getGallery"],
      });
    },
  });

  function replacePhoto() {
    uploadMedia().then((files) => {
      const file = files[0];
      setImageUrl(URL.createObjectURL(file));
      setFile(file);
    });
  }

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const ratio = img.width / img.height;
      setPhotoWidth(ratio * editedImgHeight);
    };
    img.src = imageUrl;
  }, [imageUrl]);

  return (
    <div className={classes.modalWrapper}>
      <h2>Редактирование</h2>
      <div className={classes.content}>
        <div className={classes.photo}>
          <>
            {isLoadingPhoto && (
              <div
                className={classes.spinner}
                style={{
                  height: editedImgHeight,
                  width: 300,
                }}
              >
                <Spinner color="#c59b68" width={48} height={48} />
              </div>
            )}
            <NextImage
              src={imageUrl}
              alt=""
              width={photoWidth}
              height={editedImgHeight}
              onLoad={() => setIsLoadingPhoto(false)}
              style={{
                display: isLoadingPhoto ? "none" : "block",
              }}
              unoptimized
            />
          </>
          <Button
            mode="beige"
            click={replacePhoto}
            style={{
              width: "100%",
            }}
          >
            Заменить фото
          </Button>
        </div>
        <Textarea
          width={386}
          height={184}
          littleType="Комментарий к замеру"
          initialValue={mediaObj.comment}
          onChange={(val) => setComment(val)}
        />
      </div>
      <div className={classes.btns}>
        <Button
          mode="red"
          style={{
            width: "180px",
            height: "40px",
          }}
          click={deleteWork}
          spinnerColor="#F12F2F"
          isLoading={isPendingDelete}
        >
          Удалить
        </Button>
        <div className={classes.right}>
          <Button
            mode="blackWhite"
            style={{
              width: "160px",
            }}
            click={closeEdit}
          >
            Закрыть
          </Button>
          <Button
            isLoading={isPendingSave}
            style={{
              width: "160px",
              height: "40px",
            }}
            click={saveEdits}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
}
