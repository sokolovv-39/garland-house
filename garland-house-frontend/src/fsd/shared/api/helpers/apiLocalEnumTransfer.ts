export type RemoteEnumsType =
  | "Assigned"
  | "Sign"
  | "Conducted"
  | "Canceled"
  | "Cm20"
  | "Cm40"
  | "Bracket"
  | "Rope"
  | "Screeds"
  | "Black"
  | "White"
  | "Transparent"
  | "Wenge"
  | "Gray"
  | "Pine"
  | "s_2_1"
  | "s_2_1d5"
  | "s_2_2"
  | "s_2_3"
  | "s_2_4"
  | "s_2_6"
  | "s_2_9"
  | "Standart"
  | "Premium"
  | "m3"
  | "m5"
  | "Flickering"
  | "Static"
  | "Warm"
  | "Cold"
  | "RGB"
  | "Colors7"
  | "Blue"
  | "Red"
  | "Green"
  | "Filament"
  | "Pink"
  | "Orange"
  | "Wood"
  | "Concrete"
  | "mm8x16"
  | "mm14x25"
  | "mm2"
  | "mm3"
  | "mm_16"
  | "mm_25"
  | "Screeds_200"
  | "Screeds_480_500"
  | "Wire2"
  | "Wire3"
  | "Wire5"
  | "CLient"
  | "Office";

type LocalType =
  | "Стандарт"
  | "Премиум"
  | "Прозрачный"
  | "Теплый"
  | "Холодный"
  | "Синий"
  | "Красный"
  | "Зеленый"
  | "Синий"
  | "Оранжевый"
  | "Розовый"
  | "Филамент"
  | "RGB"
  | "Сосна"
  | "3 метра"
  | "Мульти"
  | "5 метров"
  | "Мерцание"
  | "Венге"
  | "Статичное свечение"
  | "Черный"
  | "Белый"
  | "Серый"
  | "Трос"
  | "Скоба кабельная"
  | "Дерево"
  | "Бетон"
  | "20 см"
  | "40 см"
  | "2 мм"
  | "3 мм"
  | "2-проводная клемма"
  | "3-проводная клемма"
  | "5-проводная клемма"
  | "8x16 мм"
  | "14x25 мм"
  | "16 мм"
  | "25 мм"
  | "Стяжки"
  | "Скобы"
  | "2*1 м"
  | "2*1.5 м"
  | "2*2 м"
  | "2*3 м"
  | "2*4 м"
  | "2*6 м"
  | "2*9 м"
  | "Стяжка 200мм"
  | "Стяжка 480-500мм"
  | "Назначен"
  | "Подписан"
  | "Проведен"
  | "Отменен"
  | "Компания"
  | "Клиент";

export function enumToApi(val: LocalType): RemoteEnumsType {
  switch (val) {
    case "2-проводная клемма":
      return "Wire2";
    case "Стяжки":
      return "Screeds";
    case "Стяжка 200мм":
      return "Screeds_200";
    case "Стяжка 480-500мм":
      return "Screeds_480_500";
    case "Сосна":
      return "Pine";
    case "2 мм":
      return "mm2";
    case "2*1 м":
      return "s_2_1";
    case "2*1.5 м":
      return "s_2_1d5";
    case "2*2 м":
      return "s_2_2";
    case "2*3 м":
      return "s_2_3";
    case "2*4 м":
      return "s_2_4";
    case "2*6 м":
      return "s_2_6";
    case "2*9 м":
      return "s_2_9";
    case "3 мм":
      return "mm3";
    case "Венге":
      return "Wenge";
    case "Мульти":
      return "Colors7";
    case "Прозрачный":
      return "Transparent";
    case "Скобы":
      return "Bracket";
    case "Премиум":
      return "Premium";
    case "Стандарт":
      return "Standart";
    case "Теплый":
      return "Warm";
    case "RGB":
      return "RGB";
    case "Холодный":
      return "Cold";
    case "3 метра":
      return "m3";
    case "5 метров":
      return "m5";
    case "Мерцание":
      return "Flickering";
    case "Статичное свечение":
      return "Static";
    case "14x25 мм":
      return "mm14x25";
    case "16 мм":
      return "mm_16";
    case "20 см":
      return "Cm20";
    case "25 мм":
      return "mm_25";
    case "3-проводная клемма":
      return "Wire3";
    case "40 см":
      return "Cm40";
    case "5-проводная клемма":
      return "Wire5";
    case "8x16 мм":
      return "mm8x16";
    case "Белый":
      return "White";
    case "Бетон":
      return "Concrete";
    case "Дерево":
      return "Wood";
    case "Зеленый":
      return "Green";
    case "Красный":
      return "Red";
    case "Назначен":
      return "Assigned";
    case "Оранжевый":
      return "Orange";
    case "Отменен":
      return "Canceled";
    case "Подписан":
      return "Sign";
    case "Проведен":
      return "Conducted";
    case "Розовый":
      return "Pink";
    case "Серый":
      return "Gray";
    case "Синий":
      return "Blue";
    case "Скоба кабельная":
      return "Screeds";
    case "Трос":
      return "Rope";
    case "Филамент":
      return "Filament";
    case "Черный":
      return "Black";
    case "Клиент":
      return "CLient";
    case "Компания":
      return "Office";
  }
}

export function apiToEnumLocal(val: RemoteEnumsType): LocalType {
  switch (val) {
    case "CLient":
      return "Клиент";
    case "Office":
      return "Компания";
    case "Assigned":
      return "Назначен";
    case "Sign":
      return "Подписан";
    case "Conducted":
      return "Проведен";
    case "Canceled":
      return "Отменен";
    case "Black":
      return "Черный";
    case "Blue":
      return "Синий";
    case "Bracket":
      return "Скоба кабельная";
    case "Cm20":
      return "20 см";
    case "Cm40":
      return "40 см";
    case "Cold":
      return "Холодный";
    case "Colors7":
      return "Мульти";
    case "Concrete":
      return "Бетон";
    case "Filament":
      return "Филамент";
    case "Flickering":
      return "Мерцание";
    case "Gray":
      return "Серый";
    case "Green":
      return "Зеленый";
    case "Orange":
      return "Оранжевый";
    case "Pine":
      return "Сосна";
    case "Pink":
      return "Розовый";
    case "Premium":
      return "Премиум";
    case "RGB":
      return "RGB";
    case "Red":
      return "Красный";
    case "Rope":
      return "Трос";
    case "Screeds":
      return "Стяжки";
    case "Screeds_200":
      return "Стяжка 200мм";
    case "Screeds_480_500":
      return "Стяжка 480-500мм";
    case "Standart":
      return "Стандарт";
    case "Static":
      return "Статичное свечение";
    case "Transparent":
      return "Прозрачный";
    case "Warm":
      return "Теплый";
    case "Wenge":
      return "Венге";
    case "White":
      return "Белый";
    case "Wire2":
      return "2-проводная клемма";
    case "Wire3":
      return "3-проводная клемма";
    case "Wire5":
      return "5-проводная клемма";
    case "Wood":
      return "Дерево";
    case "m3":
      return "3 метра";
    case "m5":
      return "5 метров";
    case "mm14x25":
      return "14x25 мм";
    case "mm2":
      return "2 мм";
    case "mm3":
      return "3 мм";
    case "mm8x16":
      return "8x16 мм";
    case "mm_16":
      return "16 мм";
    case "mm_25":
      return "25 мм";
    case "s_2_1":
      return "2*1 м";
    case "s_2_1d5":
      return "2*1.5 м";
    case "s_2_2":
      return "2*2 м";
    case "s_2_3":
      return "2*3 м";
    case "s_2_4":
      return "2*4 м";
    case "s_2_6":
      return "2*6 м";
    case "s_2_9":
      return "2*9 м";
  }
}
