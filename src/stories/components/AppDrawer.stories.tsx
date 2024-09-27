import type { Meta, StoryObj } from "@storybook/react";

import AppDrawer from "@/components/AppDrawer";
import CommonPageHeader from "@/components/CommonPageHeader";

const meta = {
  title: "Astro Watch/Components/AppDrawer",
  component: AppDrawer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
  },
} satisfies Meta<typeof AppDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <>
        <Story />
        <CommonPageHeader title="Example" />
      </>
    ),
  ],
};
