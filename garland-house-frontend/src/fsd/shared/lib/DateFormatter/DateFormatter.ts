import { format, isToday, isYesterday } from "date-fns";
import { MonthEnum } from "./types";
import { ru } from "date-fns/locale";

export class DateFormatter {
  date?: Date;

  constructor(date?: Date) {
    if (date) this.date = date;
  }

  dateToDayMonth() {
    if (this.date) {
      return `${this.date.getDate()} ${
        MonthEnum[this.date.getMonth()]
      }`.toLocaleLowerCase();
    } else return "";
  }

  dateToDMY() {
    if (this.date) {
      const year = this.date.getFullYear();
      let month: number | string = this.date.getMonth() + 1;
      if (month < 10) month = "0" + month.toString();
      else month.toString();

      let day: number | string = this.date.getDate();
      if (day < 10) day = "0" + day.toString();
      else day.toString();

      return `${day}.${month}.${year}`;
    } else return "";
  }

  DMY_to_ms(dmy: string) {
    const date = new Date();
    const year = dmy.slice(6);
    const month = dmy.slice(3, 5);
    const day = dmy.slice(0, 2);

    date.setFullYear(parseInt(year));
    date.setMonth(parseInt(month) - 1);
    date.setDate(parseInt(day));

    return date.getTime();
  }
  DMY_to_Iso(dmy: string) {
    const ms = this.DMY_to_ms(dmy);
    const date = new Date(ms);
    return date.toISOString();
  }
  static toPrettyDate(utc: string) {
    const date = new Date(utc);
    if (isNaN(date.getTime())) return "Invalid UTC";

    if (isToday(date)) {
      return `Сегодня в ${format(date, "HH:mm", { locale: ru })}`;
    }
    if (isYesterday(date)) {
      return `Вчера в ${format(date, "HH:mm", { locale: ru })}`;
    }
    const isSameYear = new Date().getFullYear() === date.getFullYear();
    const dateFormat = isSameYear
      ? "d MMMM 'в' HH:mm"
      : "d MMMM yyyy 'в' HH:mm";
    return format(date, dateFormat, { locale: ru });
  }
}
