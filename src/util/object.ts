export function assignDefault<T extends Record<string, any>>(target: T, source: Partial<T>) {
  for (let key in Object.keys(target)) {
    if (source.hasOwnProperty(key) && source[key] !== undefined) {
      target[key as keyof T] = source[key];
    }
  }
  return target;
}
