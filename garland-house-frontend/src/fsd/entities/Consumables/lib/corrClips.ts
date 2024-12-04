import { EsWritingArrayType } from "@/fsd/features/OrderActions/model";
import {
  CorrColorsEnum,
  CorrugationType,
  getCorrPVSLength,
} from "../../CorrugationPVS";
import { CommonItemType } from "../../Item";
import { getPVSLength } from "../../PVS";

export function getEsCorrClips(
  allItems: CommonItemType[]
): EsWritingArrayType[] {
  const mergedClips: {
    color: CorrColorsEnum;
    quantity: number;
  }[] = [];

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Гофра для кабеля ПВС") {
      const corr = itemObj.item as CorrugationType;
      const length = Math.ceil(corr.length / 50) * 50;
      const quantity = length * 5;
      const index = mergedClips.findIndex((el) => el.color === corr.color);
      if (~index) {
        mergedClips[index].quantity += quantity;
      } else {
        mergedClips.push({
          color: corr.color,
          quantity,
        });
      }
    }
  });

  const es: EsWritingArrayType[] = [];

  mergedClips.forEach((clip) => {
    const pack = 50;
    const packs = Math.ceil(clip.quantity / pack);
    es.push({
      desc: `Клипсы для гофры / ${clip.color}`,
      keyValue: `${packs} уп`,
    });
  });

  return es;
}
