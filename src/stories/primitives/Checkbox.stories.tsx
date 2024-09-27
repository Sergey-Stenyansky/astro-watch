import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Checkbox from "@/primitives/Checkbox";

const meta = {
  title: "Astro Watch/Primitives/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Checkbox",
    required: true,
    checked: true,
    labelPlacement: "start",
  },
};
