export type MediaType = {
  path: string;
  contentType: string;
  typeEnum: MediaTypeEnum;
};

export enum MediaTypeEnum {
  Photo = "Photo",
  Video = "Video",
  Vizualization = "Vizualization",
}

export enum FileTypeEnum {
  Photo = "Photo",
  Video = "Video",
  Pdf = "pdf",
  MS_Word = "MS Word",
  MS_Excel = "MS Excel",
  Unknown = "Unknown",
}
