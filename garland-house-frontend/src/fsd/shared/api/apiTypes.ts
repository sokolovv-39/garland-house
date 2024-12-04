import {
  BeltLightType,
  BoxPVSType,
  CorrugationType,
  CurtainType,
  FringeType,
  MediaTypeEnum,
  PVSType,
  RelaysSwitchesType,
  RopeType,
  Screed_480_500_Type,
  SolderBoxType,
  ThreadType,
  UserType,
  VagiType,
} from "@/fsd/entities";
import { NeonType } from "@/fsd/entities/Neon/model";

export type ApiLoginType = {
  accessToken: string;
  refreshToken: string;
  userDto: UserType;
};

export type ResultUploadFileDto = {
  path: string;
  id: number;
};

export type ResultTableOrderDto = {
  id: number;
  status: string;
  customerFIO: string;
  customerPhone: string;
  address: string;
  linkToAmoCRM: string;
  managerId: number;
  executorId: number;
  createdDate: string;
  minBudget: number;
  maxBudget: number;
};

export type ResultReportDto = {
  path: string;
  fileEntityId: number;
  id: number;
  fileName: string;
};

export type CreateReportDto = Pick<ResultReportDto, "fileEntityId">;

export type CreateOrderDto = {
  id: number | null;
  status: string;
  customerFIO: string;
  customerPhone: string;
  address: string;
  linkToYandexMap: string;
  linkToYandexDisk: string;
  contractNumber: string;
  linkToAmoCRM: string;
  measurementDate: string;
  paymentMethodForMeasurement: ApiPayerEnum;
  priceForMeasurement: number;
  measurementComment: string;
  budget: number;
  managerId: number;
  executorId: number;
  versions: Array<CreateVersionDto>;
  reports: CreateReportDto[];
};

export type ResultOrderDto = Omit<CreateOrderDto, "versions" | "reports"> & {
  versions: ResultVersionDto[];
  comments: ResultCommentDto[];
  reports: ResultReportDto[];
};

export type ResultCommentDto = {
  text: string;
  commentDateTime: string;
  writerFIO: string;
};

export type ResultVersionDto = Omit<CreateVersionDto, "objects"> & {
  budget: number;
  isFavorite: boolean;
  objects: ResultObjectDto[];
  order: number;
};

export type ResultObjectDto = {
  order: number;
  name: string;
  fringes: Array<ResultFringeDto>;
  neons: Array<ResultNeonDto>;
  threads: Array<ResultThreadDto>;
  beltLights: Array<ResultBeltLightDto>;
  curtains: Array<ResultCurtainDto>;
  ropes: Array<ResultRopeDto>;
  pvsCables: Array<ResultPvsCablesDto>;
  corrugations: Array<ResultCorrDto>;
  boxPvsCabels: Array<ResultBoxPvsDto>;
  vagies: Array<ResultVagiDto>;
  solderBoxes: Array<ResultSolderBoxDto>;
  screeds_480_500: Array<ResultScreeds_480_500_Dto>;
  screeds_200: Array<ResultScreeds_200_Dto>;
  relaysSwitches: Array<ResultRelaysSwitchesDto>;
  montages: Array<ResultMontageDto>;
  electricShields: Array<ResultElectricShieldDto>;
  objectFiles: Array<ResultObjectFileDto>;
};
export enum ApiPayerEnum {
  Office = "Office",
  CLient = "CLient",
  NoData = "NoData",
}

export type CreateVersionDto = {
  isFavorite: boolean;
  objects: Array<CreateObjectDto>;
  budget: number;
  order: number;
};

export type CreateObjectDto = {
  order: number;
  name: string;
  fringes: Array<CreateFringeDto>;
  neons: Array<CreateNeonDto>;
  threads: Array<CreateThreadDto>;
  beltLights: Array<CreateBeltLightDto>;
  curtains: Array<CreateCurtainDto>;
  ropes: Array<CreateRopeDto>;
  pvsCables: Array<CreatePvsCablesDto>;
  corrugations: Array<CreateCorrDto>;
  boxPvsCabels: Array<CreateBoxPvsDto>;
  vagies: Array<CreateVagiDto>;
  solderBoxes: Array<CreateSolderBoxDto>;
  screeds_480_500: Array<CreateScreeds_480_500_Dto>;
  screeds_200: Array<CreateScreeds_200_Dto>;
  relaysSwitches: Array<CreateRelaysSwitchesDto>;
  montages: Array<CreateMontageDto>;
  electricShields: Array<CreateElectricShieldDto>;
  objectFiles: Array<CreateObjectFileDto>;
};

type ResultFringeDto = ItemToResultDto<CreateFringeDto>;
type ResultNeonDto = ItemToResultDto<CreateNeonDto>;
type ResultThreadDto = ItemToResultDto<CreateThreadDto>;
type ResultBeltLightDto = ItemToResultDto<CreateBeltLightDto>;
type ResultCurtainDto = ItemToResultDto<CreateCurtainDto>;
type ResultRopeDto = ItemToResultDto<CreateRopeDto>;
type ResultPvsCablesDto = ItemToResultDto<CreatePvsCablesDto>;
type ResultBoxPvsDto = ItemToResultDto<CreateBoxPvsDto>;
type ResultVagiDto = ItemToResultDto<CreateVagiDto>;
type ResultCorrDto = ItemToResultDto<CreateCorrDto>;
type ResultSolderBoxDto = ItemToResultDto<CreateSolderBoxDto>;
type ResultScreeds_200_Dto = ItemToResultDto<CreateScreeds_200_Dto>;
type ResultScreeds_480_500_Dto = ItemToResultDto<CreateScreeds_480_500_Dto>;
type ResultRelaysSwitchesDto = ItemToResultDto<CreateRelaysSwitchesDto>;
type ResultMontageDto = ItemToResultDto<CreateMontageDto>;
type ResultElectricShieldDto = ItemToResultDto<CreateElectricShieldDto>;

export type ResultObjectFileDto = {
  typeEnum: MediaTypeEnum;
  path: string;
  fileEntityId: number;
  id: number;
};

export type CreateObjectFileDto = {
  typeEnum: MediaTypeEnum;
  fileEntityId: number;
};

type CreateElectricShieldDto = {
  count: number;
  order: number;
};

export enum ApiStatusEnum {
  Assigned = "Assigned",
  Sign = "Sign",
  Conducted = "Conducted",
  Canceled = "Canceled",
}

type CreateMontageDto = {
  autotower_16_20m: number;
  autotower_22_24m: number;
  autotower_26_36m: number;
  autotowerByHours: number;
  autotowerMobileKm: number;
  montageFringe: number;
  montageNeon: number;
  montageThread: number;
  climber: number;
  order: number;
};

type CreateRelaysSwitchesDto = Omit<
  RelaysSwitchesType,
  | "title"
  | "wireless_1_wifi"
  | "wireless_2_wifi"
  | "wireless_3_wifi"
  | "astroRelay"
  | "photoRelay"
  | "default_1"
  | "default_2"
  | "priceObj"
> & {
  wirelessWifi_1: number;
  wirelessWifi_2: number;
  wirelessWifi_3: number;
  astroRele: number;
  photoRele: number;
  simple_1: number;
  simple_2: number;
  order: number;
};

type CreateScreeds_200_Dto = {
  count: number;
  color: string;
  order: number;
};

type CreateScreeds_480_500_Dto = Omit<
  Screed_480_500_Type,
  "title" | "quantity" | "price" | "color"
> & {
  color: string;
  count: number;
  order: number;
};

type CreateSolderBoxDto = Omit<
  SolderBoxType,
  "title" | "color" | "price" | "quantity"
> & {
  color: string;
  count: number;
  order: number;
};

type CreateVagiDto = Omit<
  VagiType,
  "title" | "model" | "price" | "quantity"
> & {
  model: string;
  count: number;
  order: number;
};

type CreateBoxPvsDto = Omit<BoxPVSType, "title" | "color" | "price"> & {
  color: string;
  order: number;
};

type CreateCorrDto = Omit<
  CorrugationType,
  "title" | "thickness" | "color" | "price"
> & {
  thickness: string;
  cableColor: string;
  order: number;
};

type CreatePvsCablesDto = Omit<PVSType, "title" | "color" | "priceObj"> & {
  cableColor: string;
  order: number;
};

type CreateRopeDto = Omit<
  RopeType,
  "title" | "thickness" | "surface" | "price"
> & {
  thickness: string;
  surface: string;
  order: number;
};

type CreateFringeDto = Omit<
  FringeType,
  | "multiplicity"
  | "title"
  | "glowShade"
  | "glowMode"
  | "cable"
  | "bracing"
  | "surface"
  | "led"
  | "price"
  | "pricePrem"
  | "extensions_1m"
  | "extensions_3m"
  | "extensions_5m"
  | "extensions_10m"
> & {
  multiplicity: string;
  glowShade: string;
  glowMode: string;
  cableColor: string;
  bracing: string;
  surface: string;
  led: string;
  extensions1m: number;
  extensions3m: number;
  extensions5m: number;
  extensions10m: number;
  order: number;
};

type CreateNeonDto = Omit<
  NeonType,
  | "title"
  | "glowShade"
  | "thickness"
  | "priceObj"
  | "extensions_1m"
  | "ral_meters"
  | "no_ral_meters"
> & {
  flexibleConnector: number;
  ralLength: number;
  glowShade: string;
  thickness: string;
  noRalLength: number;
  order: number;
};

type CreateThreadDto = Omit<
  ThreadType,
  | "title"
  | "glowShade"
  | "glowMode"
  | "cable"
  | "bracing"
  | "surface"
  | "priceObj"
  | "extensions_1m"
  | "extensions_3m"
  | "extensions_5m"
  | "extensions_10m"
  | "screedsType"
  | "tree"
> & {
  glowShade: string;
  glowMode: string;
  cableColor: string;
  bracing: string;
  surface: string;
  extensions1m: number;
  extensions3m: number;
  extensions5m: number;
  extensions10m: number;
  screedsType: string;
  treeHeight: number;
  order: number;
};

type CreateBeltLightDto = Omit<
  BeltLightType,
  | "title"
  | "glowShade"
  | "lampStep"
  | "cableColor"
  | "price_20cm"
  | "price_40cm"
  | "pvsLength"
  | "cable"
> & {
  glowShade: string;
  lampStep: string;
  cableColor: string;
  order: number;
  pvsLength: number;
};

type CreateCurtainDto = Omit<
  CurtainType,
  | "title"
  | "size"
  | "bracing"
  | "glowShade"
  | "glowMode"
  | "cable"
  | "surface"
  | "priceObj"
  | "quantity"
  | "extensions_1m"
  | "extensions_3m"
> & {
  size: string;
  bracing: string;
  glowShade: string;
  glowMode: string;
  cableColor: string;
  surface: string;
  count: number;
  extensions1m: number;
  extensions3m: number;
  order: number;
};

type ItemToResultDto<T> = T & { id: number };
