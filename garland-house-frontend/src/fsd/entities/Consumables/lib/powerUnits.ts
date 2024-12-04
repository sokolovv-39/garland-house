import { EsWritingArrayType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { FringeType } from "../../Fringe";
import { NeonThicknessEnum, NeonType } from "../../Neon/model";
import { ThreadType } from "../../Thread";
import { CurtainType } from "../../Curtain";

type MergedItemsType =
  | {
      item: "Бахрома" | "Нить" | "Занавес";
      quantity: number;
      color: string;
    }
  | {
      item: "Гибкий неон";
      quantity: number;
      thickness: NeonThicknessEnum;
      color: string;
    };

export function getEsPowerUnits(
  allItems: CommonItemType[]
): EsWritingArrayType[] {
  const mergedItems: MergedItemsType[] = [];

  allItems.forEach((itemObj) => {
    if (
      itemObj.itemTitle === "Бахрома" ||
      itemObj.itemTitle === "Нить" ||
      itemObj.itemTitle === "Занавес"
    ) {
      const item = itemObj.item as FringeType | ThreadType | CurtainType;
      const index = mergedItems.findIndex(
        (el) => el.item === itemObj.itemTitle && el.color === item.cable
      );
      if (~index) {
        mergedItems[index].quantity += item.powerUnits;
      } else {
        mergedItems.push({
          item: itemObj.itemTitle,
          quantity: item.powerUnits,
          color: item.cable,
        });
      }
    } else if (itemObj.itemTitle === "Гибкий неон") {
      const neon = itemObj.item as NeonType;
      const index = mergedItems.findIndex(
        (el) => el.item === "Гибкий неон" && el.thickness === neon.thickness
      );
      if (~index) {
        mergedItems[index].quantity += neon.powerUnits;
      } else {
        mergedItems.push({
          item: "Гибкий неон",
          quantity: neon.powerUnits,
          thickness: neon.thickness,
          color: "Черный",
        });
      }
    }
  });

  const es: EsWritingArrayType[] = [];

  mergedItems.forEach((el) => {
    if (el.item === "Гибкий неон") {
      es.push({
        desc: `Блок питания / ${el.item} / ${el.thickness} / ${el.color}`,
        keyValue: `${el.quantity} шт`,
      });
    } else {
      es.push({
        desc: `Блок питания / ${el.item} / ${el.color}`,
        keyValue: `${el.quantity} шт`,
      });
    }
  });

  return es;
}
