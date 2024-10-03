import { test, expect } from "@jest/globals";

import { render, fireEvent } from "@testing-library/react";

import AppDrawer from ".";

import i18n from "@/i18n";
import CommonPageHeader from "@/components/CommonPageHeader";

import AppProvider from "@/util/test/AppProvider";

test("app drawer renders with correct menu items", async () => {
  const { findByRole, findByText } = render(
    <AppProvider>
      <CommonPageHeader title="Test" />
      <AppDrawer />
    </AppProvider>,
  );

  fireEvent(
    await findByRole("button", { name: i18n.t("mainMenu.title") }),
    new MouseEvent("click", { bubbles: true }),
  );

  expect(await findByText(i18n.t("mainMenu.nav"))).toBeTruthy();
  expect(await findByText(i18n.t("mainMenu.feed"))).toBeTruthy();
  expect(await findByText(i18n.t("mainMenu.browse"))).toBeTruthy();
}, 10000);
