"use client";

import { FileTypeEnum } from "@/fsd/entities";
import { baseURL } from "../../api";

export function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (reader.result) {
        const base64 = (reader.result as string).split(",")[1];
        resolve(base64);
      } else reject("Не удалось прочитать файл");
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
}

export function base64ToBlob(base64: string, contentType = "") {
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let i = 0; i < byteCharacters.length; i += 512) {
    const slice = byteCharacters.slice(i, i + 512);
    const byteNumbers = new Array(slice.length);
    for (let j = 0; j < slice.length; j++) {
      byteNumbers[j] = slice.charCodeAt(j);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}

export function getFileType(url: string): FileTypeEnum {
  const photoExt = [".jpeg", ".jpg", ".png", ".gif", ".webp", ".heic", ".heif"];
  const videoExt = [".mp4", ".webm", ".ogv", ".mov"];
  const ms_word_ext = [".doc", ".docx"];
  const ms_excel_ext = [".xls", ".xlsx", ".xlsm", ".xlsb", ".xltx", ".xltm"];

  if (photoExt.some((ext) => url.endsWith(ext))) return FileTypeEnum.Photo;
  else if (videoExt.some((ext) => url.endsWith(ext))) return FileTypeEnum.Video;
  else if (ms_word_ext.some((ext) => url.endsWith(ext)))
    return FileTypeEnum.MS_Word;
  else if (url.endsWith(".pdf")) return FileTypeEnum.Pdf;
  else if (ms_excel_ext.some((ext) => url.endsWith(ext)))
    return FileTypeEnum.MS_Excel;
  else return FileTypeEnum.Unknown;
}
