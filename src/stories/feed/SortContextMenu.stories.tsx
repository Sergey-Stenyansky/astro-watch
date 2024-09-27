import type { Meta, StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { fn } from "@storybook/test";

import SortContextMenu, { SortContextMenuProps } from "@/pages/Feed/elements/SortContextMenu";
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

export const Default: StoryFn<SortContextMenuProps> = (props) => {
  const [args, setArgs] = useArgs<{ value: SortActionValues }>();
  const onChange = (value: SortActionValues) => {
    setArgs({ ...args, value });
    action("onChange")(value);
  };
  return <SortContextMenu {...props} onChange={onChange} />;
};

Default.parameters = {
  controls: {
    exclude: /^onChange$/g,
  },
};
