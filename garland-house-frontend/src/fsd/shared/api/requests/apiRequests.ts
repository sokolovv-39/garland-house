"use client";

import { api } from "../axiosConfig";
import { isServerAvailable, localOrderToApi } from "../helpers";
import {
  ResultOrderDto,
  ResultUploadFileDto,
  ResultTableOrderDto,
  ResultCommentDto,
} from "../apiTypes";
import { IndexedDB } from "@/fsd/features";
import { base64ToBlob, fileToBase64 } from "../../lib";
import { ResultWorkDto, WorkDto } from "../galleryTypes";
import { AddCommentDto } from "../commentTypes";
import { UserType } from "@/fsd/entities";
import { AxiosError } from "axios";

export async function deleteOrderRequest(backendId: number) {
  await api.delete("order/deleteOrder", {
    params: {
      orderId: backendId,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
}

export async function saveOrderRequest(orderId: number, idb: IndexedDB) {
  if (await isServerAvailable()) {
    let reqBody = await localOrderToApi(orderId, idb);
    const res = await api.post("order/saveOrder", reqBody, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res.data as ResultOrderDto;
  }
}

export async function getOrderRequest(id: number) {
  const res = await api.get("order/getOrder", {
    params: { orderId: id },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return res.data as ResultOrderDto;
}

export async function getUsersRequest() {
  const res = await api.get("user/getUsers", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  const data = (await res.data) as UserType[];
  return data;
}

export async function uploadFileRequest(file: File) {
  const mimeType = file.type;
  const form = new FormData();
  if (mimeType.startsWith("image/")) {
    const binary = await fileToBase64(file);
    form.append("file", base64ToBlob(binary), file.name);
  } else {
    form.append("file", file, file.name);
  }

  const res = await api.post("file/upload", form, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": `multipart/form-data`,
      Accept: "text/plain",
    },
  });

  const data = (await res.data) as ResultUploadFileDto;
  return data;
}

export async function getOrdersTable(idb: IndexedDB) {
  if (await isServerAvailable()) {
    const userId = (await idb.users.getCurrentUser()).id;
    const res = await api.get("order/getCardList", {
      params: {
        userId,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    return (res.data as ResultTableOrderDto[]) || [];
  } else throw new Error("Offline");
}

export async function deleteFileRequest(fileId: number) {
  await api.delete("file/delete", {
    params: {
      fileId,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
}

export async function getGalleryRequest() {
  const res = await api.get("gallery/getWorkList", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return res.data as ResultWorkDto[];
}

export async function updateGalleryRequest(media: WorkDto) {
  await api.post("gallery/createOrUpdateWork", media, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
}

export async function deleteGalleryRequest(workId: number) {
  await api.delete("gallery/deleteWork", {
    params: {
      workId,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
}

export async function addCommentRequest(comment: AddCommentDto) {
  const res = await api.post("order/addComment", comment, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return res.data as ResultCommentDto;
}
