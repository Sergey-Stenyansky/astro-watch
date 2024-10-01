export function round(value: number, places: number = 2) {
  return +value.toFixed(places);
}

export function clampRange(value: number[], range: number[]) {
  const left = Math.max(value[0], range[0]);
  const right = Math.min(value[1], range[1]);
  return [left, right];
}

export function validateRange(value: number[]) {
  return value.length === 2 && value[0] <= value[1];
}

export type InRangeOptions = {
  rightInclusive?: boolean;
};

const DEFAULT_OPTIONS = { rightInclusive: true };

export function inRange(value: number, range: number[], options: InRangeOptions = DEFAULT_OPTIONS) {
  if (options.rightInclusive) return value >= range[0] && value <= range[1];
  return value >= range[0] && value < range[1];
}
