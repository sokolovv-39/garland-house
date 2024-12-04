import { DateFormatter } from "@/fsd/shared";
import { OrderStatusType, OrderType, PayerEnum } from "./types";

export const defaultOrder: OrderType = {
  isEdited: true,
  deleted: false,
  backendId: null,
  status: "Назначен",
  customer: "",
  customerPhone: "",
  mapsLink: "",
  contractNumber: "",
  managerId: -1,
  executorId: -1,
  amoCRMLink: "",
  id: "",
  measureDate: "",
  measurePrice: 0,
  payer: PayerEnum.Office,
  clarification: "",
  address: "",
  comments: [],
  numberOfOrder: 0,
  priceWithDiscount: 0,
  duration: "",
  reports: [],
  rfpFork: {
    maxRfpPrice: 0,
    minRfpPrice: 0,
    noData: true,
  },
};

export const orderStatuses: OrderStatusType[] = [
  "Назначен",
  "Подписан",
  "Проведен",
  "Отменен",
];
