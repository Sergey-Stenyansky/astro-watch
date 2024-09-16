export function assignDefault<T extends Record<string, any>>(target: T, source: Partial<T>) {
  for (const key of Object.keys(target)) {
    // console.log("CHECK KEY", key, target[key], source[key]);
    if (Object.prototype.hasOwnProperty.call(target, key) && source[key] !== undefined) {
      target[key as keyof T] = source[key];
    }
  }
  return target;
}
