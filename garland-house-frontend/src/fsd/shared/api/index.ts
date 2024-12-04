export { api, baseURL } from "./axiosConfig";
export type {
  ApiLoginType,
  CreateOrderDto,
  ResultObjectFileDto,
  ResultUploadFileDto,
  ResultCommentDto,
  ResultReportDto,
} from "./apiTypes";
export { ApiStatusEnum } from "./apiTypes";
export {
  isServerAvailable,
  enumToApi,
  localOrderToApi,
  apiOrderToLocal,
} from "./helpers";
export {
  deleteOrderRequest,
  saveOrderRequest,
  getOrderRequest,
  getUsersRequest,
  uploadFileRequest,
  getOrdersTable,
  deleteFileRequest,
  getGalleryRequest,
  updateGalleryRequest,
  addCommentRequest,
  deleteGalleryRequest,
} from "./requests";
export type { ResultWorkDto, WorkDto } from "./galleryTypes";
export type { AddCommentDto } from "./commentTypes";
