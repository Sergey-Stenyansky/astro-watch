import { CSSProperties, memo, ReactElement, useState } from "react";
import { Typography, Slider } from "@mui/material";
import { isNumber, isString } from "@/util/type";
import { useDebounce, useUpdateEffect } from "react-use";

type SliderValueType = number[] | null | undefined;

interface ComponentProps {
  value?: SliderValueType;
  min?: number;
  max?: number;
  label?: string | ReactElement;
  debounce?: number;
  onChange: (value: number[]) => void;
  className?: string;
  formatValueLabel?: (value: number) => string | number;
  style?: CSSProperties;
}

const defaultValue = [0, 0];

const RangeSlider = ({
  min,
  max,
  value,
  label,
  className,
  onChange,
  debounce,
  formatValueLabel,
  style,
}: ComponentProps) => {
  const [innerValue, setInnerValue] = useState<SliderValueType>(value);
  useDebounce(() => innerValue && onChange(innerValue), debounce, [innerValue, onChange]);
  useUpdateEffect(() => setInnerValue(value), [value]);
  return (
    <>
      {isString(label) ? <Typography>{label}</Typography> : label}
      <div className={className} style={style}>
        <Slider
          min={min}
          max={max}
          value={innerValue || defaultValue}
          valueLabelDisplay="auto"
          valueLabelFormat={formatValueLabel}
          onChange={(_, value: number | number[]) => {
            if (isNumber(value)) {
              if (innerValue) {
                return setInnerValue([value, innerValue[1]]);
              }
              return setInnerValue([value, value]);
            }
            setInnerValue(value);
          }}
          disableSwap
        />
      </div>
    </>
  );
};

export default memo(RangeSlider);
