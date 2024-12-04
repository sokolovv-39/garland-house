import {
  CreateObjectFileDto,
  ResultObjectFileDto,
} from "@/fsd/shared/api/apiTypes";
import { MediaType } from "../../Media";

export type ObjectType = {
  id: string;
  media: (CreateObjectFileDto & {
    path: string;
  })[];
  order: number;
  title: string;
  measureId: string;
};
