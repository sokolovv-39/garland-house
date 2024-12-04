import { EsWritingArrayType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { NeonType } from "../../Neon/model";
import { getNeonLength } from "../../Neon";

export function getEsMetalProfile(
  allItems: CommonItemType[]
): EsWritingArrayType[] {
  const mergedItems: Pick<
    NeonType,
    "thickness" | "ral" | "ral_meters" | "no_ral_meters" | "painting" | "length"
  >[] = [];

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Гибкий неон") {
      const neon = itemObj.item as NeonType;
      const index = mergedItems.findIndex(
        (item) =>
          item.thickness === neon.thickness &&
          item.painting === neon.painting &&
          item.ral === neon.ral
      );
      if (~index) {
        mergedItems[index].no_ral_meters += neon.no_ral_meters;
        mergedItems[index].ral_meters += neon.ral_meters;
        mergedItems[index].length += neon.length;
      } else {
        mergedItems.push({
          thickness: neon.thickness,
          ral: neon.ral,
          ral_meters: neon.ral_meters,
          no_ral_meters: neon.no_ral_meters,
          painting: neon.painting,
          length: neon.length,
        });
      }
    }
  });

  const pack = 2;

  const rfp: EsWritingArrayType[] = [];
  mergedItems.forEach((item) => {
    if (!item.painting) {
      const packs = Math.ceil(getNeonLength(item.length).skeinMeters / pack);
      rfp.push({
        desc: `Профиль металлический / 2 м / непокрашенный / ${item.thickness}`,
        keyValue: `${packs} шт`,
      });
    } else {
      const ral_packs = Math.ceil(item.ral_meters / pack);
      const no_ral_packs = Math.ceil(item.no_ral_meters / pack);
      rfp.push({
        desc: `Профиль металлический / 2 м / покрашенный / RAL ${item.ral}`,
        keyValue: `${ral_packs} шт`,
      });
      rfp.push({
        desc: `Профиль металлический / 2 м / непокрашенный`,
        keyValue: `${no_ral_packs} шт`,
      });
    }
  });

  return rfp;
}
