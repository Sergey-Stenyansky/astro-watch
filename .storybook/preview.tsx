import React from "react";

import type { Preview } from "@storybook/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AppNavigationProvider } from "../src/components/AppNavigation/provider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { I18nextProvider } from "react-i18next";

import store from "../src/store";
import theme from "../src/theme";
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
          <BrowserRouter>
            <AppNavigationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={theme}>
                  <Story />
                  <CssBaseline />
                </ThemeProvider>
              </LocalizationProvider>
            </AppNavigationProvider>
          </BrowserRouter>
        </I18nextProvider>
      </Provider>
    ),
  ],
};

export default preview;
