import { EsWritingArrayType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { RelaysSwitchesType } from "../model";

export function getRelaysSwitches(
  allItems: CommonItemType[]
): EsWritingArrayType[] {
  let default_1 = 0;
  let default_2 = 0;
  let switch_1_btn = 0;
  let switch_2_btn = 0;
  let switch_3_btn = 0;
  let relays = 0;
  let relays_wifi = 0;
  let photoRelay = 0;
  let astroRelay = 0;
  let timeRelay = 0;

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Реле и выключатели") {
      const item = itemObj.item as RelaysSwitchesType;
      switch_1_btn += item.wireless_1 + item.wireless_1_wifi;
      switch_2_btn += item.wireless_2 + item.wireless_2_wifi;
      switch_3_btn += item.wireless_3 + item.wireless_3_wifi;
      relays += item.wireless_1 + item.wireless_2 * 2 + item.wireless_3 * 3;
      relays_wifi +=
        item.wireless_1_wifi +
        item.wireless_2_wifi * 2 +
        item.wireless_3_wifi * 3;
      photoRelay += item.photoRelay;
      astroRelay += item.astroRelay;
      default_1 += item.default_1;
      default_2 += item.default_2;
      timeRelay += item.timeRelay;
    }
  });

  const es: EsWritingArrayType[] = [];
  es.push({
    desc: "Обычный выключатель 1-клавишный",
    keyValue: `${default_1} шт`,
  });
  es.push({
    desc: "Обычный выключатель 2-клавишный",
    keyValue: `${default_2} шт`,
  });
  es.push({
    desc: "Беспроводной 1-клавишный выключатель",
    keyValue: `${switch_1_btn} шт`,
  });
  es.push({
    desc: "Беспроводной 2-клавишный выключатель",
    keyValue: `${switch_2_btn} шт`,
  });
  es.push({
    desc: "Беспроводной 3-клавишный выключатель",
    keyValue: `${switch_3_btn} шт`,
  });
  es.push({
    desc: "Радиореле",
    keyValue: `${relays} шт`,
  });
  es.push({
    desc: "Радиореле (WIFI)",
    keyValue: `${relays_wifi} шт`,
  });
  es.push({
    desc: "Фотореле",
    keyValue: `${photoRelay} шт`,
  });
  es.push({
    desc: "Астрономическое реле",
    keyValue: `${astroRelay} шт`,
  });
  es.push({
    desc: "Реле времени",
    keyValue: `${timeRelay} шт`,
  });
  return es;
}
