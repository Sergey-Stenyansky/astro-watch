import { useState } from "react";
import { useDebounce } from "react-use";

function useDebouncedValue<T>(value: T, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useDebounce(() => setDebouncedValue(value), delay, [value]);
  return debouncedValue;
}

export default useDebouncedValue;
