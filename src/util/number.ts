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
