import { assocPath, compose } from "ramda";

export enum SortOrder {
  asc = "asc",
  desc = "desc",
  off = "off",
}

export type SortField = {
  name: string;
  values: SortOrder[];
};

export type SortingReducerState<T extends string> = {
  activeField: T;
  defaultField: T;
  sortOrder: SortOrder;
  sortFields: Record<T, SortField>;
};

export enum SortingActionTypes {
  toggle = "toggle",
  setOrder = "setOrder",
  setSorting = "setSorting",
  toggleOrder = "toggleOrder",
}

function sortFieldToggler(field: SortField, order?: SortOrder) {
  let next = order ? field.values.indexOf(order) + 1 : 0;
  next = field.values.length > next ? next : 0;
  return field.values[next];
}

export type SortingActions<T extends string> =
  | {
      type: SortingActionTypes.toggle;
      payload: T;
    }
  | {
      type: SortingActionTypes.setOrder;
      payload: SortOrder;
    }
  | {
      type: SortingActionTypes.toggleOrder;
    }
  | {
      type: SortingActionTypes.setSorting;
      payload: { field: T; order: SortOrder };
    };

export function sortingReducer<T extends string>(
  state: SortingReducerState<T>,
  action: SortingActions<T>,
) {
  switch (action.type) {
    case SortingActionTypes.toggle: {
      const field = state.sortFields[action.payload];
      const order = sortFieldToggler(
        field,
        action.payload === state.activeField ? state.sortOrder : undefined,
      );
      return compose(
        assocPath(["activeField"], action.payload),
        assocPath(["sortOrder"], order),
      )(state) as SortingReducerState<T>;
    }
    case SortingActionTypes.setOrder: {
      return assocPath(["sortOrder"], action.payload)(state) as SortingReducerState<T>;
    }
    case SortingActionTypes.toggleOrder: {
      const field = state.sortFields[state.activeField];
      const order = sortFieldToggler(field, state.sortOrder);
      return assocPath(["sortOrder"], order)(state) as SortingReducerState<T>;
    }
    case SortingActionTypes.setSorting: {
      return compose(
        assocPath(["activeField"], action.payload.field),
        assocPath(["sortOrder"], action.payload.order),
      )(state) as SortingReducerState<T>;
    }
  }
  return state;
}

export const sortActions = {
  toggle: <T extends string>(payload: T) =>
    ({
      type: SortingActionTypes.toggle,
      payload,
    } as const),
  setOrder: (payload: SortOrder) =>
    ({
      type: SortingActionTypes.toggle,
      payload,
    } as const),
  toggleOrder: () =>
    ({
      type: SortingActionTypes.toggle,
    } as const),
  setSorting: <T extends string>(field: T, order: SortOrder) =>
    ({
      type: SortingActionTypes.setSorting,
      payload: { field, order },
    } as const),
};
