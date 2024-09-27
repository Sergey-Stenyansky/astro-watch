import type { Meta, StoryFn } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { action } from "@storybook/addon-actions";
import { fn } from "@storybook/test";

import DatePickerPair, { DatePickerPairProps } from "@/primitives/DatePickerPair";

import dayjs from "dayjs";
import formatDate, { DateFormat } from "@/util/date/format";

import { convertDate, controls } from "../util";

const meta = {
  title: "Astro Watch/Primitives/DatePickerPair",
  component: DatePickerPair,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: controls.text(),
    firstLabel: controls.text(),
    secondLabel: controls.text(),
    firstDate: controls.date(),
    secondDate: controls.date(),
    allowFrom: controls.date(),
    allowTo: controls.date(),
  },
  args: {
    onChangeFirstDate: fn(),
    onChangeSecondDate: fn(),
    label: "Title",
    firstLabel: "First Date",
    secondLabel: "Second Date",
    firstDate: formatDate(dayjs(), DateFormat.shortDateISO),
    secondDate: formatDate(dayjs().add(7, "days"), DateFormat.shortDateISO),
  },
} satisfies Meta<typeof DatePickerPair>;
export default meta;

type StoryArgs = {
  allowFrom: number;
  allowTo: number;
  firstDate: number | string;
  secondDate: number | string;
};

export const Default: StoryFn<DatePickerPairProps> = (props) => {
  const [args, setArgs] = useArgs<StoryArgs>();
  const onChangeFirstDate = (value: string | null) => {
    if (!value) return;
    setArgs({ ...args, firstDate: convertDate(value) });
    action("onChangeFirstDate")(value);
  };
  const onChangeSecondDate = (value: string | null) => {
    if (!value) return;
    setArgs({ ...args, secondDate: convertDate(value) });
    action("onChangeSecondDate")(value);
  };
  return (
    <DatePickerPair
      {...props}
      firstDate={convertDate(args.firstDate)}
      secondDate={convertDate(args.secondDate)}
      onChangeFirstDate={onChangeFirstDate}
      onChangeSecondDate={onChangeSecondDate}
    />
  );
};

Default.parameters = {
  controls: {
    exclude: /^(allowTo|allowFrom|allowedRange|onChangeFirstDate|onChangeSecondDate)$/g,
  },
};

export const WithAllowedRange: StoryFn<DatePickerPairProps> = (props) => {
  const [args, setArgs] = useArgs<StoryArgs>();
  const onChangeFirstDate = (value: string | null) => {
    if (!value) return;
    setArgs({ ...args, firstDate: convertDate(value) });
    action("onChangeFirstDate")(value);
  };
  const onChangeSecondDate = (value: string | null) => {
    if (!value) return;
    setArgs({ ...args, secondDate: convertDate(value) });
    action("onChangeSecondDate")(value);
  };
  return (
    <DatePickerPair
      {...props}
      allowFrom={dayjs(args.allowFrom)}
      allowTo={dayjs(args.allowTo)}
      firstDate={convertDate(args.firstDate)}
      secondDate={convertDate(args.secondDate)}
      onChangeFirstDate={onChangeFirstDate}
      onChangeSecondDate={onChangeSecondDate}
    />
  );
};

WithAllowedRange.args = { allowFrom: dayjs(), allowTo: dayjs().add(7, "days") };

WithAllowedRange.parameters = {
  controls: {
    exclude: /^(allowedRange|onChangeFirstDate|onChangeSecondDate)$/g,
  },
};
