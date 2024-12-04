import {
  EsWritingArrayType,
  LineType,
} from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { FringeCableEnum, FringeType } from "../../Fringe";
import { BeltLightType } from "../../BeltLight";
import {
  NeonGlowShadeEnum,
  NeonThicknessEnum,
  NeonType,
} from "../../Neon/model";
import { ThreadType } from "../../Thread";
import { CurtainCableEnum, CurtainType } from "../../Curtain";
import { PVSColorEnum } from "../../PVS";

export const extPrice = 200;
export const teePrice = 500;

type ExtMultType = "1м" | "3м" | "5м" | "10м";

export function getEsExtensions(
  allItems: CommonItemType[]
): EsWritingArrayType[] {
  const mergedFringe: {
    extMult: ExtMultType;
    cable: FringeCableEnum;
    quantity: number;
  }[] = [];
  const mergedNeon: {
    thickness: NeonThicknessEnum;
    quantity: number;
  }[] = [];
  const mergedThread: {
    cable: PVSColorEnum;
    extMult: ExtMultType;
    quantity: number;
  }[] = [];
  const mergedCurtain: {
    cable: CurtainCableEnum;
    extMult: Exclude<ExtMultType, "5м" | "10м">;
    quantity: number;
  }[] = [];

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Бахрома") {
      const item = itemObj.item as FringeType;
      const is_1_m = !!item.extensions_1m;
      const is_3_m = !!item.extensions_3m;
      const is_5_m = !!item.extensions_5m;
      const is_10_m = !!item.extensions_10m;
      let index = mergedFringe.findIndex(
        (el) => el.cable === item.cable && el.extMult === "1м"
      );
      if (~index) {
        mergedFringe[index].quantity += item.extensions_1m;
      } else {
        mergedFringe.push({
          extMult: "1м",
          cable: item.cable,
          quantity: item.extensions_1m,
        });
      }
      index = mergedFringe.findIndex(
        (el) => el.cable === item.cable && el.extMult === "3м"
      );
      if (~index) {
        mergedFringe[index].quantity += item.extensions_3m;
      } else {
        mergedFringe.push({
          extMult: "3м",
          cable: item.cable,
          quantity: item.extensions_3m,
        });
      }
      index = mergedFringe.findIndex(
        (el) => el.cable === item.cable && el.extMult === "5м"
      );
      if (~index) {
        mergedFringe[index].quantity += item.extensions_5m;
      } else {
        mergedFringe.push({
          extMult: "5м",
          cable: item.cable,
          quantity: item.extensions_5m,
        });
      }
      index = mergedFringe.findIndex(
        (el) => el.cable === item.cable && el.extMult === "10м"
      );
      if (~index) {
        mergedFringe[index].quantity += item.extensions_10m;
      } else {
        mergedFringe.push({
          extMult: "10м",
          cable: item.cable,
          quantity: item.extensions_10m,
        });
      }
    }
  });

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Гибкий неон") {
      const neon = itemObj.item as NeonType;
      const index = mergedNeon.findIndex(
        (el) => el.thickness === neon.thickness
      );
      if (~index) {
        mergedNeon[index].quantity += neon.extensions_1m;
      } else {
        mergedNeon.push({
          thickness: neon.thickness,
          quantity: neon.extensions_1m,
        });
      }
    }
  });

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Нить") {
      const thread = itemObj.item as ThreadType;
      const is_1_m = !!thread.extensions_1m;
      const is_3_m = !!thread.extensions_3m;
      const is_5_m = !!thread.extensions_5m;
      const is_10_m = !!thread.extensions_10m;
      let index = mergedThread.findIndex(
        (el) => el.cable === thread.cable && el.extMult === "1м"
      );
      if (~index) {
        mergedThread[index].quantity += thread.extensions_1m;
      } else {
        mergedThread.push({
          cable: thread.cable,
          extMult: "1м",
          quantity: thread.extensions_1m,
        });
      }
      index = mergedThread.findIndex(
        (el) => el.cable === thread.cable && el.extMult === "3м"
      );
      if (~index) {
        mergedThread[index].quantity += thread.extensions_3m;
      } else {
        mergedThread.push({
          cable: thread.cable,
          extMult: "3м",
          quantity: thread.extensions_3m,
        });
      }
      index = mergedThread.findIndex(
        (el) => el.cable === thread.cable && el.extMult === "5м"
      );
      if (~index) {
        mergedThread[index].quantity += thread.extensions_5m;
      } else {
        mergedThread.push({
          cable: thread.cable,
          extMult: "5м",
          quantity: thread.extensions_5m,
        });
      }
      index = mergedThread.findIndex(
        (el) => el.cable === thread.cable && el.extMult === "10м"
      );
      if (~index) {
        mergedThread[index].quantity += thread.extensions_10m;
      } else {
        mergedThread.push({
          cable: thread.cable,
          extMult: "10м",
          quantity: thread.extensions_10m,
        });
      }
    }
  });

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Занавес") {
      const curtain = itemObj.item as CurtainType;
      const is_1_m = !!curtain.extensions_1m;
      const is_3_m = !!curtain.extensions_3m;
      let index = mergedCurtain.findIndex(
        (el) => el.cable === curtain.cable && el.extMult === "1м"
      );
      if (~index) {
        mergedCurtain[index].quantity += curtain.extensions_1m;
      } else {
        mergedCurtain.push({
          quantity: curtain.extensions_1m,
          extMult: "1м",
          cable: curtain.cable,
        });
      }
      index = mergedCurtain.findIndex(
        (el) => el.cable === curtain.cable && el.extMult === "3м"
      );
      if (~index) {
        mergedCurtain[index].quantity += curtain.extensions_3m;
      } else {
        mergedCurtain.push({
          quantity: curtain.extensions_3m,
          extMult: "3м",
          cable: curtain.cable,
        });
      }
    }
  });

  const esExt: EsWritingArrayType[] = [];

  mergedFringe.forEach((el) => {
    esExt.push({
      desc: `Удлинитель / бахрома / ${el.extMult} / ${el.cable}`,
      keyValue: `${el.quantity} шт`,
    });
  });

  mergedNeon.forEach((el) => {
    esExt.push({
      desc: `Соединитель / гибкий неон / черный / ${el.thickness}`,
      keyValue: `${el.quantity} шт`,
    });
  });

  mergedThread.forEach((el) => {
    esExt.push({
      desc: `Удлинитель / нить / ${el.extMult} / ${el.cable}`,
      keyValue: `${el.quantity} шт`,
    });
  });

  mergedCurtain.forEach((el) => {
    esExt.push({
      desc: `Удлинитель / занавес / ${el.extMult} / ${el.cable}`,
      keyValue: `${el.quantity} шт`,
    });
  });

  return esExt;
}

export function getRFPExtensions(allItems: CommonItemType[]) {
  let fringeExt = 0;
  let threadExt = 0;
  let fringeTee = 0;
  let threadTee = 0;
  let curtainExt = 0;
  let curtainTee = 0;

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Бахрома") {
      const fringe = itemObj.item as FringeType;
      fringeExt +=
        fringe.extensions_1m * extPrice +
        fringe.extensions_3m * 3 * extPrice +
        fringe.extensions_5m * 5 * extPrice +
        fringe.extensions_10m * 10 * extPrice;
      fringeTee += fringe.tees * teePrice;
    }
    if (itemObj.itemTitle === "Нить") {
      const thread = itemObj.item as ThreadType;
      threadExt +=
        thread.extensions_1m * extPrice +
        thread.extensions_3m * 3 * extPrice +
        thread.extensions_5m * 5 * extPrice +
        thread.extensions_10m * 10 * extPrice;
      threadTee += thread.tees * teePrice;
    }
    if (itemObj.itemTitle === "Занавес") {
      const curtain = itemObj.item as CurtainType;
      curtainExt +=
        curtain.extensions_1m * extPrice + curtain.extensions_3m * 3 * extPrice;
      curtainTee += curtain.tees * teePrice;
    }
  });

  const overall =
    fringeExt + threadExt + fringeTee + threadTee + curtainExt + curtainTee;
  return overall;
}
