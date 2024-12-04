"use client";

import { useContext, useEffect, useState } from "react";
import classes from "./Report.module.scss";
import { FileTypeEnum, markOrderAsEdited, MediaList } from "@/fsd/entities";
import {
  baseURL,
  deleteFileRequest,
  IDBContext,
  uploadFileRequest,
} from "@/fsd/shared";
import { useMutation } from "@tanstack/react-query";

export function Report({ orderId }: { orderId: number }) {
  const [urls, setUrls] = useState<string[]>([]);
  const idb = useContext(IDBContext);
  const [loadQuantity, setLoadQuantity] = useState(0);
  const { mutateAsync: uploadFile } = useMutation({
    mutationFn: (file: File) => uploadFileRequest(file),
  });
  const { mutateAsync: deleteFileMutation } = useMutation({
    mutationFn: (fileId: number) => deleteFileRequest(fileId),
  });

  async function addFiles(files: FileList) {
    setLoadQuantity((prev) => prev + files.length);
    await Promise.all(
      Array.from(files).map(async (file) => {
        const uploadedFile = await uploadFile(file);
        const absolutePath = `${baseURL}/${uploadedFile.path}`;
        const order = await idb!.orders.get(orderId);
        await idb!.orders.update({
          ...order,
          reports: [
            ...order.reports,
            {
              path: absolutePath,
              id: uploadedFile.id,
              fileEntityId: uploadedFile.id,
              fileName: file.name,
            },
          ],
        });
        setUrls((prev) => [...prev, absolutePath]);
        setLoadQuantity((prev) => prev - 1);
      })
    );

    await markOrderAsEdited(idb!, orderId);
  }

  async function deleteFile(delUrl: string) {
    const order = await idb!.orders.get(orderId);
    const deletedFile = order.reports.find((report) => report.path === delUrl);
    await deleteFileMutation(deletedFile!.fileEntityId);
    const filtFiles = order.reports.filter(
      (report) => report.path !== deletedFile!.path
    );
    await idb!.orders.update({
      ...order,
      reports: filtFiles,
    });
    setUrls((prev) => prev.filter((url) => url !== deletedFile!.path));
  }

  useEffect(() => {
    (async function () {
      const order = await idb!.orders.get(orderId);
      const allUrls = order.reports.map((report) => report.path);
      setUrls(allUrls);
    })();
  }, [orderId]);

  return (
    <div className={classes.wrapper}>
      <h2 className={classes.title}>Отчет</h2>
      <MediaList
        loadQuantity={loadQuantity}
        orderId={orderId}
        urls={urls}
        callback={addFiles}
        deleteMedia={deleteFile}
        mediaHeight={120}
        mediaWidth={200}
      />
    </div>
  );
}
