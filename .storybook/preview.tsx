import React from "react";

import type { Preview } from "@storybook/react";
import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { withThemeFromJSXProvider } from "@storybook/addon-themes";

import { I18nextProvider } from "react-i18next";

import store from "../src/store";
import { CssBaseline, ThemeProvider } from "@mui/material";
import i18n from "../src/i18n";
import { themeFactory } from "../src/theme/factory";

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
            <Story />
          </LocalizationProvider>
        </I18nextProvider>
      </Provider>
    ),
    withThemeFromJSXProvider({
      themes: {
        light: themeFactory({ mode: "light" }),
        dark: themeFactory({ mode: "dark" }),
      },
      defaultTheme: "light",
      Provider: ThemeProvider,
      GlobalStyles: CssBaseline,
    }),
  ],
};

export default preview;
