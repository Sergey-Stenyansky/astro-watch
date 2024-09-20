import { AstroObjectInterface } from "@/services/api/schema/feed";
import { CriteriaListFilter, CriteriaLogic, type FlagCriteria } from "../filters";
import { groupBy, omit } from "ramda";
import dayjs, { Dayjs } from "dayjs";

import {
  withinWeek,
  withinMonth,
  withinYear,
  tomorrow,
  thisDay,
  aboveYear,
  past,
} from "@/util/date";

import i18n from "@/i18n";

export enum ApproachDateCriteria {
  today = "today",
  tomorrow = "tomorrow",
  withinWeek = "withinWeek",
  withinMonth = "withinMonth",
  withinYear = "withinYear",
  sometime = "sometime",
  past = "past",
}

type DateCompare = (a: Dayjs, b: Dayjs) => boolean;

const compareFuns: Record<ApproachDateCriteria, DateCompare> = {
  [ApproachDateCriteria.today]: thisDay,
  [ApproachDateCriteria.tomorrow]: tomorrow,
  [ApproachDateCriteria.withinWeek]: withinWeek,
  [ApproachDateCriteria.withinMonth]: withinMonth,
  [ApproachDateCriteria.withinYear]: withinYear,
  [ApproachDateCriteria.sometime]: aboveYear,
  [ApproachDateCriteria.past]: past,
};

export class ApproachDateFilter extends CriteriaListFilter<AstroObjectInterface> {
  constructor() {
    super(CriteriaLogic.or);
  }

  buildCriteria(items: AstroObjectInterface[]) {
    const today = dayjs();

    function groupItems(item: AstroObjectInterface): ApproachDateCriteria {
      const date = dayjs(item.closeApproachData[0].closeApproachDate);
      if (thisDay(date)) {
        return ApproachDateCriteria.today;
      }
      if (tomorrow(date)) {
        return ApproachDateCriteria.tomorrow;
      }
      if (withinWeek(date, today)) {
        return ApproachDateCriteria.withinWeek;
      }
      if (withinMonth(date, today)) {
        return ApproachDateCriteria.withinMonth;
      }
      if (withinYear(date, today)) {
        return ApproachDateCriteria.withinWeek;
      }
      if (aboveYear(date, today)) {
        return ApproachDateCriteria.sometime;
      }
      return ApproachDateCriteria.past;
    }

    const groups = groupBy(groupItems, items);

    const criteriaFactory = (name: string) => {
      const checkFun = (item: AstroObjectInterface) => {
        const checkFun = compareFuns[name as ApproachDateCriteria];
        const date = dayjs(item.closeApproachData[0].closeApproachDate);
        if (!date.isValid()) return false;
        return checkFun(date, today);
      };

      return { name, checkFun, label: i18n.t("feed.dateCriteria" + "." + name) };
    };

    const result: FlagCriteria[] = [];

    if (groups.today) {
      result.push(criteriaFactory(ApproachDateCriteria.today));
    }
    if (groups.tomorrow) {
      result.push(criteriaFactory(ApproachDateCriteria.tomorrow));
    }
    if (groups.withinWeek) {
      result.push(criteriaFactory(ApproachDateCriteria.withinWeek));
    }
    if (groups.withinMonth) {
      result.push(criteriaFactory(ApproachDateCriteria.withinMonth));
    }
    if (groups.withinYear) {
      result.push(criteriaFactory(ApproachDateCriteria.withinYear));
    }
    if (groups.sometime) {
      result.push(criteriaFactory(ApproachDateCriteria.sometime));
    }
    if (groups.past) {
      result.push(criteriaFactory(ApproachDateCriteria.past));
    }

    return result;
  }

  get plainObject() {
    return { criteriaList: this.criteriaList.map((c) => omit(["checkFun"], c)) };
  }
}
