import type { Meta, StoryObj } from "@storybook/react";

import { fn } from "@storybook/test";

import SortContextMenu from "@/pages/Feed/elements/SortContextMenu";
import { controls } from "../util";

import { useArgs } from "@storybook/preview-api";
import { SortActionValues } from "@/pages/Feed/elements/SortContextMenu/types";

const meta = {
  title: "Astro Watch/Feed/SortContextMenu",
  component: SortContextMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: controls.radio(["name-desc", "name-asc", "date-desc", "date-asc"]),
  },
  args: { onChange: fn(), value: "date-desc" as any },
} satisfies Meta<typeof SortContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    controls: {
      exclude: /^onChange$/g,
    },
  },
  decorators: [
    (Story, context) => {
      const [args, setArgs] = useArgs<{ value: SortActionValues }>();
      return (
        <Story
          args={{
            ...context.allArgs,
            ...args,
            onChange: (value: SortActionValues) => setArgs({ ...args, value }),
          }}
        />
      );
    },
  ],
};
