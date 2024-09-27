import React from "react";

import type { Preview } from "@storybook/react";
import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { CssBaseline } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { I18nextProvider } from "react-i18next";

import store from "../src/store";
import AppThemeProvider from "../src/theme/provider";
import i18n from "../src/i18n";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AppThemeProvider>
              <Story />
              <CssBaseline />
            </AppThemeProvider>
          </LocalizationProvider>
        </I18nextProvider>
      </Provider>
    ),
  ],
};

export default preview;
