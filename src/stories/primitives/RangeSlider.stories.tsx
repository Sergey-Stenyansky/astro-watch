import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import RangeSlider from "@/primitives/RangeSlider";
import { controls } from "../util";

const meta = {
  title: "Astro Watch/Primitives/RangeSlider",
  component: RangeSlider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: controls.text(),
    value: controls.object(),
    min: controls.number(1, 1000, 1),
    max: controls.number(1, 1000, 1),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
  args: { onChange: fn(), value: [1, 1000], min: 1, max: 1000 },
} satisfies Meta<typeof RangeSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "RangeSlider",
  },
  parameters: {
    controls: {
      exclude: /^(debounce|className|style|formatValueLabel|onChange)$/g,
    },
  },
};
