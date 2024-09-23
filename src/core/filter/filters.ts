import { pipe } from "ramda";

export abstract class FilterField<T> {
  apply = (items: T[]) => {
    if (!this.isApplied) return items;
    if (items.length === 0) return items;
    return items.filter(this.checkFun);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  init(_: T[]) {}

  abstract checkFun(item: T): boolean;

  abstract get isApplied(): boolean;
}

export enum CriteriaLogic {
  or,
  and,
}

export type FlagCriteria = {
  name: string;
  label?: string;
  value?: boolean;
  checkFun: (value: any) => boolean;
};

export abstract class CriteriaListFilter<T> extends FilterField<T> {
  criteriaList: FlagCriteria[] = [];

  constructor(public logic: CriteriaLogic) {
    super();
  }

  init(items: T[]): void {
    this.criteriaList = this.buildCriteria(items);
  }

  abstract buildCriteria(items: T[]): FlagCriteria[];

  checkFun = (item: T) => {
    if (this.logic === CriteriaLogic.and) {
      return this.appliedCriteria.every((c) => c.value && c.checkFun(item));
    }
    return this.appliedCriteria.some((c) => c.value && c.checkFun(item));
  };

  get isApplied() {
    return this.appliedCriteria.length > 0;
  }

  get appliedCriteria() {
    return this.criteriaList.filter((c) => c.value);
  }
}

export class Filter<T, F extends Record<string, FilterField<any>>> {
  constructor(public filters: F) {}

  init(items: T[]) {
    this.fieldValues.forEach((f) => f.init(items));
  }

  apply = (items: T[]) => {
    const checkFuns = this.fieldValues.map((f) => f.apply);
    //@ts-ignore
    return pipe(...checkFuns)(items);
  };

  get fieldValues(): FilterField<T>[] {
    return Object.values(this.filters);
  }
}
