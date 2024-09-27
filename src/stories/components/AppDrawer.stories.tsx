import type { Meta, StoryObj } from "@storybook/react";

import AppDrawer from "@/components/AppDrawer";
import CommonPageHeader from "@/components/CommonPageHeader";
import { BrowserRouter } from "react-router-dom";
import AppDrawerContextProvider from "@/components/AppDrawer/AppDrawerContextProvider";
import { AppNavigationProvider } from "@/components/AppNavigation/provider";
import AppThemeProvider from "@/theme/provider";

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
  decorators: [
    (Story) => (
      <BrowserRouter>
        <AppNavigationProvider>
          <AppDrawerContextProvider>
            <AppThemeProvider>
              <CommonPageHeader title="Example" />
              <Story />
            </AppThemeProvider>
          </AppDrawerContextProvider>
        </AppNavigationProvider>
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof AppDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
