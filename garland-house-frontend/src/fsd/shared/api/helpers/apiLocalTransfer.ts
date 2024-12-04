import {
  beltLightDefault,
  BeltLightGlowShadeEnum,
  BeltLightLampStepEnum,
  BeltLightType,
  BoxPVSColourEnum,
  boxPvsDefault,
  BoxPVSType,
  CorrColorsEnum,
  CorrThicknessEnum,
  corrugationDefault,
  CorrugationType,
  CurtainBracingEnum,
  CurtainCableEnum,
  curtainDefault,
  CurtainGlowModeEnum,
  CurtainGlowShadeEnum,
  CurtainSizeEnum,
  CurtainSurfaceEnum,
  CurtainType,
  defaultFringe,
  defaultThread,
  electricShieldDefault,
  ElectricShieldType,
  FringeMultiplicityEnum,
  FringeType,
  montageDefault,
  MontageType,
  OrderStatusType,
  OrderType,
  PVSColorEnum,
  pvsDefault,
  PVSType,
  relaysSwitchesDefault,
  RelaysSwitchesType,
  ropeDefault,
  RopeSurfaceEnum,
  RopeThicknessEnum,
  RopeType,
  screed_200_default,
  Screed_200_Type,
  screed_480_500_default,
  Screed_480_500_Type,
  SolderBoxColorEnum,
  solderBoxDefault,
  SolderBoxType,
  ThreadBracingEnum,
  ThreadGlowModeEnum,
  ThreadGlowShadeEnum,
  ThreadScreedsTypeEnum,
  ThreadSurfaceEnum,
  ThreadType,
  vagiDefault,
  VagiModelEnum,
  VagiType,
} from "@/fsd/entities";
import { IndexedDB } from "@/fsd/features";
import {
  apiToEnumLocal,
  enumToApi,
  RemoteEnumsType,
} from "./apiLocalEnumTransfer";
import {
  defaultNeon,
  NeonGlowShadeEnum,
  NeonThicknessEnum,
  NeonType,
} from "@/fsd/entities/Neon/model";
import {
  ApiPayerEnum,
  CreateObjectDto,
  CreateOrderDto,
  CreateVersionDto,
  ResultOrderDto,
} from "../apiTypes";
import { nanoid } from "nanoid";
import {
  FringeBracingEnum,
  FringeCableEnum,
  FringeGlowModeEnum,
  FringeGlowShadeEnum,
  FringeLedEnum,
  FringeSurfaceEnum,
} from "@/fsd/entities/Fringe";
import { PayerEnum } from "@/fsd/entities/Order/model/types";
import { DateFormatter } from "../../lib";
import { baseURL } from "../axiosConfig";
import { generateRFP } from "@/fsd/features/OrderActions/lib";

export async function localOrderToApi(
  orderId: number,
  idb: IndexedDB
): Promise<CreateOrderDto> {
  const order = await idb?.orders.get(orderId)!;
  let reqBody: CreateOrderDto = {
    id: order.backendId,
    status: enumToApi(order.status),
    customerFIO: order.customer,
    customerPhone: order.customerPhone,
    address: order.address,
    linkToYandexDisk: "",
    linkToYandexMap: order.mapsLink,
    contractNumber: order.contractNumber,
    linkToAmoCRM: order.amoCRMLink,
    measurementDate: new DateFormatter().DMY_to_Iso(order.measureDate),
    paymentMethodForMeasurement: order.payer
      ? (enumToApi(order.payer) as ApiPayerEnum)
      : ApiPayerEnum.NoData,
    priceForMeasurement: order.measurePrice,
    measurementComment: order.clarification,
    budget: order.rfpFork.maxRfpPrice,
    managerId: order.managerId,
    executorId: order.executorId,
    versions: [],
    reports: order.reports.map((report) => ({
      fileEntityId: report.fileEntityId,
    })),
  };
  const measures = (await idb?.measures.getOwn(orderId)) || [];
  await Promise.all(
    measures.map(async (measure) => {
      const version: CreateVersionDto = {
        objects: [],
        isFavorite: measure.isFavourite,
        budget: (await generateRFP(idb, measure.id, false)) || 0,
        order: measure.order,
      };
      const objects = (await idb?.objects.getOwn(measure.id)) || [];
      await Promise.all(
        objects.map(async (obj) => {
          const apiObj: CreateObjectDto = {
            order: obj.order,
            fringes: [],
            neons: [],
            threads: [],
            beltLights: [],
            curtains: [],
            ropes: [],
            pvsCables: [],
            corrugations: [],
            boxPvsCabels: [],
            vagies: [],
            solderBoxes: [],
            screeds_480_500: [],
            screeds_200: [],
            relaysSwitches: [],
            montages: [],
            electricShields: [],
            name: obj.title,
            objectFiles: obj.media.map((file) => {
              return {
                typeEnum: file.typeEnum,
                fileEntityId: file.fileEntityId,
              };
            }),
          };
          const items = (await idb?.items.getOwn(obj.id)) || [];
          items.forEach((itemObj) => {
            switch (itemObj.itemTitle) {
              case "Бахрома":
                {
                  const fringe = itemObj.item as FringeType;
                  apiObj.fringes.push({
                    order: itemObj.order,
                    multiplicity: enumToApi(fringe.multiplicity),
                    glowShade: enumToApi(fringe.glowShade),
                    glowMode: enumToApi(fringe.glowMode),
                    cableColor: enumToApi(fringe.cable),
                    bracing: enumToApi(fringe.bracing),
                    surface: enumToApi(fringe.surface),
                    led: enumToApi(fringe.led),
                    extensions1m: fringe.extensions_1m,
                    extensions3m: fringe.extensions_3m,
                    extensions5m: fringe.extensions_5m,
                    extensions10m: fringe.extensions_10m,
                    length: fringe.length,
                    tees: fringe.tees,
                    powerUnits: fringe.powerUnits,
                    contours: fringe.contours,
                  });
                }
                break;
              case "Белт-лайт":
                {
                  const beltLight = itemObj.item as BeltLightType;
                  apiObj.beltLights.push({
                    order: itemObj.order,
                    glowShade: enumToApi(beltLight.glowShade),
                    lampStep: enumToApi(beltLight.lampStep),
                    cableColor: enumToApi(beltLight.cable),
                    pvsLength: beltLight.pvsLength,
                    length: beltLight.length,
                    contours: beltLight.contours,
                  });
                }
                break;
              case "Ваги (клемма)":
                {
                  const vagi = itemObj.item as VagiType;
                  apiObj.vagies.push({
                    order: itemObj.order,
                    model: enumToApi(vagi.model),
                    count: vagi.quantity,
                  });
                }
                break;
              case "Гибкий неон":
                {
                  const neon = itemObj.item as NeonType;
                  apiObj.neons.push({
                    order: itemObj.order,
                    flexibleConnector: neon.extensions_1m,
                    ralLength: neon.ral_meters,
                    ral: neon.ral,
                    noRalLength: neon.no_ral_meters,
                    glowShade: enumToApi(neon.glowShade),
                    thickness: enumToApi(neon.thickness),
                    length: neon.length,
                    powerUnits: neon.powerUnits,
                    painting: neon.painting,
                    contours: neon.contours,
                    isScreeds_200mm: neon.isScreeds_200mm,
                    needles: neon.needles,
                    plugs: neon.plugs,
                  });
                }
                break;
              case "Гофра для кабеля ПВС":
                {
                  const corr = itemObj.item as CorrugationType;
                  apiObj.corrugations.push({
                    order: itemObj.order,
                    thickness: enumToApi(corr.thickness),
                    cableColor: enumToApi(corr.color),
                    length: corr.length,
                  });
                }
                break;
              case "Занавес":
                {
                  const curtain = itemObj.item as CurtainType;
                  apiObj.curtains.push({
                    order: itemObj.order,
                    size: enumToApi(curtain.size),
                    bracing: enumToApi(curtain.bracing),
                    glowShade: enumToApi(curtain.glowShade),
                    glowMode: enumToApi(curtain.glowMode),
                    cableColor: enumToApi(curtain.cable),
                    surface: enumToApi(curtain.surface),
                    count: curtain.quantity,
                    extensions1m: curtain.extensions_1m,
                    extensions3m: curtain.extensions_3m,
                    contours: curtain.contours,
                    tees: curtain.tees,
                    powerUnits: curtain.powerUnits,
                  });
                }
                break;
              case "Кабель ПВС": {
                const pvs = itemObj.item as PVSType;
                apiObj.pvsCables.push({
                  order: itemObj.order,
                  cableColor: enumToApi(pvs.color),
                  length: pvs.length,
                });
                break;
              }

              case "Кабель-канал (короб) для кабеля ПВС":
                {
                  const box = itemObj.item as BoxPVSType;
                  apiObj.boxPvsCabels.push({
                    order: itemObj.order,
                    color: enumToApi(box.color),
                    length: box.length,
                  });
                }
                break;
              case "Монтаж и логистика":
                {
                  const montage = itemObj.item as MontageType;
                  apiObj.montages.push({
                    order: itemObj.order,
                    autotower_16_20m: montage.m_16_20,
                    autotower_22_24m: montage.m_22_24,
                    autotower_26_36m: montage.m_26_36,
                    autotowerByHours: montage.m_26_36_hourly,
                    autotowerMobileKm: montage.distance,
                    montageFringe: montage.complex_fringe,
                    montageNeon: montage.complex_neon,
                    montageThread: montage.complex_thread,
                    climber: montage.climber,
                  });
                }
                break;
              case "Нить":
                {
                  const thread = itemObj.item as ThreadType;
                  apiObj.threads.push({
                    order: itemObj.order,
                    glowShade: enumToApi(thread.glowShade),
                    glowMode: enumToApi(thread.glowMode),
                    cableColor: enumToApi(thread.cable),
                    bracing: enumToApi(thread.bracing),
                    surface: enumToApi(thread.surface),
                    extensions1m: thread.extensions_1m,
                    extensions3m: thread.extensions_3m,
                    extensions5m: thread.extensions_5m,
                    extensions10m: thread.extensions_10m,
                    screedsType: enumToApi(thread.screedsType),
                    treeHeight: thread.tree.height,
                    length: thread.length,
                    powerUnits: thread.powerUnits,
                    contours: thread.contours,
                    tees: thread.tees,
                  });
                }
                break;
              case "Распаячная коробка":
                {
                  const solderBox = itemObj.item as SolderBoxType;
                  apiObj.solderBoxes.push({
                    order: itemObj.order,
                    color: enumToApi(solderBox.color),
                    count: solderBox.quantity,
                  });
                }
                break;
              case "Реле и выключатели":
                {
                  const relaysSwitches = itemObj.item as RelaysSwitchesType;
                  apiObj.relaysSwitches.push({
                    order: itemObj.order,
                    wirelessWifi_1: relaysSwitches.wireless_1_wifi,
                    wirelessWifi_2: relaysSwitches.wireless_2_wifi,
                    wirelessWifi_3: relaysSwitches.wireless_3_wifi,
                    astroRele: relaysSwitches.astroRelay,
                    photoRele: relaysSwitches.photoRelay,
                    simple_1: relaysSwitches.default_1,
                    simple_2: relaysSwitches.default_2,
                    wireless_1: relaysSwitches.wireless_1,
                    wireless_2: relaysSwitches.wireless_2,
                    wireless_3: relaysSwitches.wireless_3,
                    timeRelay: relaysSwitches.timeRelay,
                  });
                }
                break;
              case "Стяжка 200мм":
                {
                  const screed = itemObj.item as Screed_200_Type;
                  apiObj.screeds_200.push({
                    order: itemObj.order,
                    count: screed.quantity,
                    color: enumToApi(screed.color),
                  });
                }
                break;
              case "Стяжка 480-500мм":
                {
                  const screed = itemObj.item as Screed_480_500_Type;
                  apiObj.screeds_480_500.push({
                    order: itemObj.order,
                    color: enumToApi(screed.color),
                    count: screed.quantity,
                  });
                }
                break;
              case "Трос":
                {
                  const rope = itemObj.item as RopeType;
                  apiObj.ropes.push({
                    order: itemObj.order,
                    thickness: enumToApi(rope.thickness),
                    surface: enumToApi(rope.surface),
                    length: rope.length,
                    contours: rope.contours,
                    lanyards: rope.lanyards,
                    duplexClamps: rope.duplexClamps,
                  });
                }
                break;
              case "Электрический щиток":
                {
                  const shield = itemObj.item as ElectricShieldType;
                  apiObj.electricShields.push({
                    order: itemObj.order,
                    count: shield.quantity,
                  });
                }
                break;
              default:
                break;
            }
          });
          version.objects.push(apiObj);
        })
      );
      reqBody.versions.push(version);
    })
  );

  return reqBody;
}

export async function apiOrderToLocal(
  remoteOrder: ResultOrderDto,
  idb: IndexedDB
) {
  const localOrder: OrderType = {
    reports: remoteOrder.reports.map((report) => ({
      ...report,
      path: `${baseURL}/${report.path}`,
    })),
    isEdited: false,
    deleted: false,
    backendId: remoteOrder.id!,
    status: apiToEnumLocal(
      remoteOrder.status as RemoteEnumsType
    ) as OrderStatusType,
    customer: remoteOrder.customerFIO,
    customerPhone: remoteOrder.customerPhone,
    mapsLink: remoteOrder.linkToYandexMap,
    contractNumber: remoteOrder.contractNumber,
    managerId: remoteOrder.managerId,
    executorId: remoteOrder.executorId,
    amoCRMLink: remoteOrder.linkToAmoCRM,
    id: nanoid(),
    measureDate: new DateFormatter(
      new Date(remoteOrder.measurementDate)
    ).dateToDMY(),
    measurePrice: remoteOrder.priceForMeasurement,
    payer:
      remoteOrder.paymentMethodForMeasurement !== "NoData"
        ? (apiToEnumLocal(remoteOrder.paymentMethodForMeasurement) as PayerEnum)
        : null,
    clarification: remoteOrder.measurementComment,
    address: remoteOrder.address,
    comments: remoteOrder.comments,
    numberOfOrder: remoteOrder.id!,
    priceWithDiscount: 0,
    duration: "",
    rfpFork: {
      noData: true,
      maxRfpPrice: 0,
      minRfpPrice: 0,
    },
  };

  await idb.orders.update(localOrder);

  await Promise.all(
    remoteOrder.versions.map(async (measure) => {
      const measureId = nanoid();
      await idb.measures.update({
        id: measureId,
        order: measure.order,
        isFavourite: measure.isFavorite,
        ownOrder: remoteOrder.id!,
      });

      await Promise.all(
        measure.objects.map(async (object) => {
          const objectId = nanoid();
          await idb.objects.update({
            id: objectId,
            media: object.objectFiles.map((file) => ({
              path: `${baseURL}/${file.path}`,
              typeEnum: file.typeEnum,
              fileEntityId: file.fileEntityId,
            })),
            order: object.order,
            title: object.name,
            measureId,
          });

          await Promise.all(
            object.beltLights.map(async (apiItem) => {
              const item: BeltLightType = {
                ...beltLightDefault,
                length: apiItem.length,
                glowShade: apiToEnumLocal(
                  apiItem.glowShade as RemoteEnumsType
                ) as BeltLightGlowShadeEnum,
                lampStep: apiToEnumLocal(
                  apiItem.lampStep as RemoteEnumsType
                ) as BeltLightLampStepEnum,
                cable: apiToEnumLocal(
                  apiItem.cableColor as RemoteEnumsType
                ) as PVSColorEnum,
                contours: apiItem.contours,
                pvsLength: apiItem.pvsLength,
              };
              await idb.items.update({
                id: nanoid(),
                itemTitle: "Белт-лайт",
                item: item,
                objectId,
                order: apiItem.order,
              });
            })
          );

          await Promise.all(
            object.boxPvsCabels.map(async (apiItem) => {
              const item: BoxPVSType = {
                ...boxPvsDefault,
                color: apiToEnumLocal(
                  apiItem.color as RemoteEnumsType
                ) as BoxPVSColourEnum,
                length: apiItem.length,
              };
              await idb.items.update({
                id: nanoid(),
                itemTitle: "Кабель-канал (короб) для кабеля ПВС",
                item: item,
                objectId,
                order: apiItem.order,
              });
            })
          );

          await Promise.all(
            object.corrugations.map(async (apiItem) => {
              const item: CorrugationType = {
                ...corrugationDefault,
                thickness: apiToEnumLocal(
                  apiItem.thickness as RemoteEnumsType
                ) as CorrThicknessEnum,
                color: apiToEnumLocal(
                  apiItem.cableColor as RemoteEnumsType
                ) as CorrColorsEnum,
                length: apiItem.length,
              };
              await idb.items.update({
                id: nanoid(),
                itemTitle: "Гофра для кабеля ПВС",
                item: item,
                objectId,
                order: apiItem.order,
              });
            })
          );

          await Promise.all(
            object.curtains.map(async (apiItem) => {
              const item: CurtainType = {
                ...curtainDefault,
                size: apiToEnumLocal(
                  apiItem.size as RemoteEnumsType
                ) as CurtainSizeEnum,
                bracing: apiToEnumLocal(
                  apiItem.bracing as RemoteEnumsType
                ) as CurtainBracingEnum,
                glowMode: apiToEnumLocal(
                  apiItem.glowMode as RemoteEnumsType
                ) as CurtainGlowModeEnum,
                glowShade: apiToEnumLocal(
                  apiItem.glowShade as RemoteEnumsType
                ) as CurtainGlowShadeEnum,
                cable: apiToEnumLocal(
                  apiItem.cableColor as RemoteEnumsType
                ) as CurtainCableEnum,
                surface: apiToEnumLocal(
                  apiItem.surface as RemoteEnumsType
                ) as CurtainSurfaceEnum,
                quantity: apiItem.count,
                powerUnits: apiItem.powerUnits,
                tees: apiItem.tees,
                extensions_1m: apiItem.extensions1m,
                extensions_3m: apiItem.extensions3m,
              };
              await idb.items.update({
                id: nanoid(),
                itemTitle: "Занавес",
                item: item,
                objectId,
                order: apiItem.order,
              });
            })
          );

          await Promise.all(
            object.electricShields.map(async (apiItem) => {
              const item: ElectricShieldType = {
                ...electricShieldDefault,
                quantity: apiItem.count,
              };
              await idb.items.update({
                id: nanoid(),
                itemTitle: "Электрический щиток",
                item: item,
                objectId,
                order: apiItem.order,
              });
            })
          );

          await Promise.all(
            object.fringes.map(async (apiItem) => {
              const item: FringeType = {
                ...defaultFringe,
                multiplicity: apiToEnumLocal(
                  apiItem.multiplicity as RemoteEnumsType
                ) as FringeMultiplicityEnum,
                length: apiItem.length,
                glowMode: apiToEnumLocal(
                  apiItem.glowMode as RemoteEnumsType
                ) as FringeGlowModeEnum,
                glowShade: apiToEnumLocal(
                  apiItem.glowShade as RemoteEnumsType
                ) as FringeGlowShadeEnum,
                cable: apiToEnumLocal(
                  apiItem.cableColor as RemoteEnumsType
                ) as FringeCableEnum,
                bracing: apiToEnumLocal(
                  apiItem.bracing as RemoteEnumsType
                ) as FringeBracingEnum,
                tees: apiItem.tees,
                powerUnits: apiItem.powerUnits,
                led: apiToEnumLocal(
                  apiItem.led as RemoteEnumsType
                ) as FringeLedEnum,
                contours: apiItem.contours,
                surface: apiToEnumLocal(
                  apiItem.surface as RemoteEnumsType
                ) as FringeSurfaceEnum,
                extensions_1m: apiItem.extensions1m,
                extensions_3m: apiItem.extensions3m,
                extensions_5m: apiItem.extensions5m,
                extensions_10m: apiItem.extensions10m,
              };
              await idb.items.update({
                id: nanoid(),
                itemTitle: "Бахрома",
                item: item,
                objectId,
                order: apiItem.order,
              });
            })
          );

          await Promise.all(
            object.montages.map(async (apiItem) => {
              const item: MontageType = {
                ...montageDefault,
                m_16_20: apiItem.autotower_16_20m,
                m_22_24: apiItem.autotower_22_24m,
                m_26_36: apiItem.autotower_26_36m,
                distance: apiItem.autotowerMobileKm,
                m_26_36_hourly: apiItem.autotowerByHours,
                climber: apiItem.climber,
                complex_fringe: apiItem.montageFringe,
                complex_neon: apiItem.montageNeon,
                complex_thread: apiItem.montageThread,
              };
              await idb.items.update({
                id: nanoid(),
                itemTitle: "Монтаж и логистика",
                item: item,
                objectId,
                order: apiItem.order,
              });
            })
          );

          await Promise.all(
            object.neons.map(async (apiItem) => {
              const item: NeonType = {
                ...defaultNeon,
                length: apiItem.length,
                glowShade: apiToEnumLocal(
                  apiItem.glowShade as RemoteEnumsType
                ) as NeonGlowShadeEnum,
                thickness: apiToEnumLocal(
                  apiItem.thickness as RemoteEnumsType
                ) as NeonThicknessEnum,
                painting: apiItem.painting,
                needles: apiItem.needles,
                powerUnits: apiItem.powerUnits,
                contours: apiItem.contours,
                extensions_1m: apiItem.flexibleConnector,
                ral: apiItem.ral,
                no_ral_meters: apiItem.noRalLength,
                ral_meters: apiItem.ralLength,
                plugs: apiItem.plugs,
                isScreeds_200mm: apiItem.isScreeds_200mm,
              };
              await idb.items.update({
                id: nanoid(),
                itemTitle: "Гибкий неон",
                item: item,
                objectId,
                order: apiItem.order,
              });
            })
          );

          await Promise.all(
            object.pvsCables.map(async (apiItem) => {
              const item: PVSType = {
                ...pvsDefault,
                length: apiItem.length,
                color: apiToEnumLocal(
                  apiItem.cableColor as RemoteEnumsType
                ) as PVSColorEnum,
              };
              await idb.items.update({
                id: nanoid(),
                itemTitle: "Кабель ПВС",
                item: item,
                objectId,
                order: apiItem.order,
              });
            })
          );

          await Promise.all(
            object.relaysSwitches.map(async (apiItem) => {
              const item: RelaysSwitchesType = {
                ...relaysSwitchesDefault,
                wireless_1: apiItem.wireless_1,
                wireless_2: apiItem.wireless_2,
                wireless_3: apiItem.wireless_3,
                wireless_1_wifi: apiItem.wirelessWifi_1,
                wireless_2_wifi: apiItem.wirelessWifi_2,
                wireless_3_wifi: apiItem.wirelessWifi_3,
                astroRelay: apiItem.astroRele,
                photoRelay: apiItem.photoRele,
                default_1: apiItem.simple_1,
                default_2: apiItem.simple_2,
                timeRelay: apiItem.timeRelay,
              };
              await idb.items.update({
                id: nanoid(),
                itemTitle: "Реле и выключатели",
                item: item,
                objectId,
                order: apiItem.order,
              });
            })
          );

          await Promise.all(
            object.ropes.map(async (apiItem) => {
              const item: RopeType = {
                ...ropeDefault,
                length: apiItem.length,
                thickness: apiToEnumLocal(
                  apiItem.thickness as RemoteEnumsType
                ) as RopeThicknessEnum,
                contours: apiItem.contours,
                surface: apiToEnumLocal(
                  apiItem.surface as RemoteEnumsType
                ) as RopeSurfaceEnum,
                lanyards: apiItem.lanyards,
                duplexClamps: apiItem.duplexClamps,
              };
              await idb.items.update({
                id: nanoid(),
                itemTitle: "Трос",
                item: item,
                objectId,
                order: apiItem.order,
              });
            })
          );

          await Promise.all(
            object.screeds_200.map(async (apiItem) => {
              const item: Screed_200_Type = {
                ...screed_200_default,
                quantity: apiItem.count,
                color: apiToEnumLocal(
                  apiItem.color as RemoteEnumsType
                ) as PVSColorEnum,
              };
              await idb.items.update({
                id: nanoid(),
                itemTitle: "Стяжка 200мм",
                item: item,
                objectId,
                order: apiItem.order,
              });
            })
          );

          await Promise.all(
            object.screeds_480_500.map(async (apiItem) => {
              const item: Screed_480_500_Type = {
                ...screed_480_500_default,
                quantity: apiItem.count,
                color: apiToEnumLocal(
                  apiItem.color as RemoteEnumsType
                ) as PVSColorEnum,
              };
              await idb.items.update({
                id: nanoid(),
                itemTitle: "Стяжка 480-500мм",
                item: item,
                objectId,
                order: apiItem.order,
              });
            })
          );

          await Promise.all(
            object.solderBoxes.map(async (apiItem) => {
              const item: SolderBoxType = {
                ...solderBoxDefault,
                color: apiToEnumLocal(
                  apiItem.color as RemoteEnumsType
                ) as SolderBoxColorEnum,
                quantity: apiItem.count,
              };
              await idb.items.update({
                id: nanoid(),
                itemTitle: "Распаячная коробка",
                item: item,
                objectId,
                order: apiItem.order,
              });
            })
          );

          await Promise.all(
            object.threads.map(async (apiItem) => {
              const threadBracing =
                apiItem.bracing === "Bracket"
                  ? "Скобы"
                  : apiToEnumLocal(apiItem.bracing as RemoteEnumsType);
              const item: ThreadType = {
                ...defaultThread,
                length: apiItem.length,
                glowShade: apiToEnumLocal(
                  apiItem.glowShade as RemoteEnumsType
                ) as ThreadGlowShadeEnum,
                glowMode: apiToEnumLocal(
                  apiItem.glowMode as RemoteEnumsType
                ) as ThreadGlowModeEnum,
                cable: apiToEnumLocal(
                  apiItem.cableColor as RemoteEnumsType
                ) as PVSColorEnum,
                bracing: threadBracing as ThreadBracingEnum,
                powerUnits: apiItem.powerUnits,
                tees: apiItem.tees,
                surface: apiToEnumLocal(
                  apiItem.surface as RemoteEnumsType
                ) as ThreadSurfaceEnum,
                contours: apiItem.contours,
                extensions_1m: apiItem.extensions1m,
                extensions_3m: apiItem.extensions3m,
                extensions_5m: apiItem.extensions5m,
                extensions_10m: apiItem.extensions10m,
                screedsType: apiToEnumLocal(
                  apiItem.screedsType as RemoteEnumsType
                ) as ThreadScreedsTypeEnum,
                tree: {
                  ...defaultThread.tree,
                  isActive: !!apiItem.treeHeight,
                  height: apiItem.treeHeight,
                },
              };
              await idb.items.update({
                id: nanoid(),
                itemTitle: "Нить",
                item: item,
                objectId,
                order: apiItem.order,
              });
            })
          );

          await Promise.all(
            object.vagies.map(async (apiItem) => {
              const item: VagiType = {
                ...vagiDefault,
                quantity: apiItem.count,
                model: apiToEnumLocal(
                  apiItem.model as RemoteEnumsType
                ) as VagiModelEnum,
              };
              await idb.items.update({
                id: nanoid(),
                itemTitle: "Ваги (клемма)",
                item: item,
                objectId,
                order: apiItem.order,
              });
            })
          );
        })
      );
    })
  );
}
