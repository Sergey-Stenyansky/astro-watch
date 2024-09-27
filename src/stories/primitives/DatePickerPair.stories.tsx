import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { fn } from "@storybook/test";

import DatePickerPair from "@/primitives/DatePickerPair";

import dayjs from "dayjs";
import formatDate, { DateFormat } from "@/util/date/format";

import { convertDate, controls } from "../util";

const meta = {
  title: "Primitives/DatePickerPair",
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

type Story = StoryObj<typeof meta>;

type StoryArgs = {
  allowFrom: number;
  allowTo: number;
  firstDate: number | string;
  secondDate: number | string;
};

export const Default: Story = {
  parameters: {
    controls: {
      exclude: /^(allowTo|allowFrom|allowedRange|onChangeFirstDate|onChangeSecondDate)$/g,
    },
  },
  decorators: [
    (Story, context) => {
      const [args, setArgs] = useArgs<StoryArgs>();
      return (
        <Story
          {...context}
          args={{
            ...context.allArgs,
            firstDate: convertDate(args.firstDate),
            secondDate: convertDate(args.secondDate),
            onChangeFirstDate: (value: string | null) => {
              if (!value) return;
              setArgs({ ...args, firstDate: convertDate(value) });
            },
            onChangeSecondDate: (value: string | null) => {
              if (!value) return;
              setArgs({ ...args, secondDate: convertDate(value) });
            },
          }}
        />
      );
    },
  ],
};

export const WithAllowedRange: Story = {
  args: {
    allowFrom: dayjs(),
    allowTo: dayjs().add(7, "days"),
  },
  parameters: {
    controls: {
      exclude: /^(allowedRange|onChangeFirstDate|onChangeSecondDate)$/g,
    },
  },
  decorators: [
    (Story, context) => {
      const [args, setArgs] = useArgs<StoryArgs>();
      return (
        <Story
          {...context}
          args={{
            ...context.allArgs,
            allowFrom: dayjs(args.allowFrom),
            allowTo: dayjs(args.allowTo),
            firstDate: convertDate(args.firstDate),
            secondDate: convertDate(args.secondDate),
            onChangeFirstDate: (value: string | null) => {
              if (!value) return;
              setArgs({ ...args, firstDate: convertDate(value) });
            },
            onChangeSecondDate: (value: string | null) => {
              if (!value) return;
              setArgs({ ...args, secondDate: convertDate(value) });
            },
          }}
        />
      );
    },
  ],
};
