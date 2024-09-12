export function isString(value: any): value is string {
  return typeof value === "string";
}

export function isNumber(value: any): value is number {
  return typeof value === "number";
}

export function isBoolean(value: any): value is boolean {
  return typeof value === "boolean";
}

export function isJSXContent(value: any): value is string {
  return (
    isString(value) || isNumber(value) || isBoolean(value) || value === null || value === undefined
  );
}
