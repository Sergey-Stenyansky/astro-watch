export function assignDefault<T extends Record<string, any>>(target: T, source: Partial<T>) {
  for (const key in Object.keys(target)) {
    if (Object.prototype.hasOwnProperty.call(target, key) && source[key] !== undefined) {
      target[key as keyof T] = source[key];
    }
  }
  return target;
}
