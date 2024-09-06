import { pipe } from "ramda";

export abstract class FilterField<T> {
  apply = (items: T[]) => {
    if (!this.isApplied) return items;
    if (items.length === 0) return items;
    return items.filter(this.checkFun);
  };

  abstract checkFun(item: T): boolean;

  abstract get isApplied(): boolean;
}

export abstract class FlagCriteria<T> {
  abstract checkFun(item: T): boolean;
}

export class Filter<T, F extends Record<string, FilterField<any>>> {
  constructor(public filters: F) {}

  apply = (items: T[]) => {
    const checkFuns = this.fieldValues.map((f) => f.apply);
    //@ts-ignore
    return pipe(...checkFuns)(items);
  };

  get fieldValues(): FilterField<T>[] {
    return Object.values(this.filters);
  }
}
