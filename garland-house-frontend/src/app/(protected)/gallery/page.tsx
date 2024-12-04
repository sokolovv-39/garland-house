"use client";

import { Header } from "@/fsd/widgets/Header/ui/Header";
import classes from "./page.module.scss";
import {
  baseURL,
  Button,
  getGalleryRequest,
  Photo,
  Spinner,
  Textarea,
  updateGalleryRequest,
  uploadFileRequest,
} from "@/fsd/shared";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { AddMedia, FileTypeEnum, Media } from "@/fsd/entities";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function GalleryPage() {
  const [isAdd, setIsAdd] = useState(false);
  const { data: gallery, isFetching: isFetchGallery } = useQuery({
    queryKey: ["getGallery"],
    queryFn: getGalleryRequest,
    select: (data) => {
      return data.map((mediaObj) => ({
        ...mediaObj,
        path: `${baseURL}/${mediaObj.path}`,
      }));
    },
  });

  function closeAdd() {
    setIsAdd(false);
  }

  function openAdd() {
    setIsAdd(true);
  }

  return (
    <div className={classes.wrapper}>
      <Header />
      <div className={classes.titleAdd}>
        <h1>Галерея работ</h1>
        <Button click={openAdd}>Добавить фото</Button>
      </div>
      <div className={classes.gallery}>
        {isFetchGallery ? (
          <div className={classes.spinner}>
            <Spinner color="rgb(197, 155, 104)" width={100} height={100} />
          </div>
        ) : (
          <>
            {gallery?.map((mediaObj) => {
              return <Photo key={mediaObj.id} mediaObj={mediaObj} />;
            })}
          </>
        )}
      </div>
      <Modal
        ariaHideApp={false}
        isOpen={isAdd}
        onRequestClose={closeAdd}
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
        <AddModal closeModal={closeAdd} />
      </Modal>
    </div>
  );
}

function AddModal({ closeModal }: { closeModal: () => void }) {
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [comment, setComment] = useState("");
  const [objectUrl, setObjectUrl] = useState("");

  const { mutate: uploadMedia, isPending } = useMutation({
    mutationFn: async () => {
      if (file && comment) {
        const media = await uploadFileRequest(file);
        await updateGalleryRequest({
          fileEntityId: media.id,
          comment: comment,
        });
        queryClient.invalidateQueries({
          queryKey: ["getGallery"],
        });
      }
    },
    onSuccess: () => {
      closeModal();
    },
  });

  function deleteMedia() {
    setFile(null);
    setObjectUrl("");
  }

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [objectUrl]);

  return (
    <div className={classes.modalWrapper}>
      <h2> Добавление фото</h2>
      <div className={classes.content}>
        {file ? (
          <Media
            specFileType={FileTypeEnum.Photo}
            isModal={false}
            src={objectUrl}
            deleteMedia={deleteMedia}
            mediaHeight={136}
            mediaWidth={208}
          />
        ) : (
          <AddMedia
            width={208}
            height={136}
            callback={(files) => {
              setObjectUrl(URL.createObjectURL(files[0]));
              setFile(files[0]);
            }}
          />
        )}
        <Textarea
          width={375}
          height={136}
          littleType="Добавьте описание"
          onChange={(val) => setComment(val)}
        />
      </div>
      <div
        className={classes.btns}
        style={{
          justifyContent: "flex-end",
        }}
      >
        <div className={classes.right}>
          <Button
            mode="blackWhite"
            style={{
              width: "160px",
            }}
            click={closeModal}
          >
            Закрыть
          </Button>
          <Button
            isLoading={isPending}
            style={{
              width: 160,
              height: 40,
            }}
            click={uploadMedia}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
}
