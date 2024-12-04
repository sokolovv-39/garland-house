import { ResultCommentDto, ResultReportDto } from "@/fsd/shared";

export type OrderType = {
  isEdited: boolean;
  deleted: boolean;
  backendId: number | null;
  status: OrderStatusType;
  customer: string;
  customerPhone: string;
  mapsLink: string;
  contractNumber: string;
  managerId: number;
  executorId: number;
  amoCRMLink: string;
  id: string;
  measureDate: string;
  measurePrice: number;
  payer: PayerEnum | null;
  clarification: string;
  address: string;
  comments: ResultCommentDto[];
  numberOfOrder: number;
  priceWithDiscount: number;
  duration: string;
  reports: ResultReportDto[];
  rfpFork: {
    noData: boolean;
    maxRfpPrice: number;
    minRfpPrice: number;
  };
};

export enum PayerEnum {
  Office = "Компания",
  Client = "Клиент",
}

export type OrderStatusType = "Назначен" | "Подписан" | "Проведен" | "Отменен";
