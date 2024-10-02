import { test, expect } from "@jest/globals";

import { render, fireEvent } from "@testing-library/react";

import SortContextMenu from ".";

import i18n from "@/i18n";
import { SortActionValues } from "./types";

test("sort context renders with correct menu items", async () => {
  let sorting = undefined;
  const onChange = (value: SortActionValues) => (sorting = value);
  const { findByRole, findAllByRole } = render(
    <SortContextMenu value={sorting} onChange={onChange} />,
  );

  fireEvent(
    await findByRole("button", { name: i18n.t("sort.word") + " " + i18n.t("menu.pickFromList") }),
    new MouseEvent("click", { bubbles: true }),
  );

  expect(
    await findByRole("menuitem", {
      name: i18n.t("feed.sort.name") + " " + i18n.t("sorting.asc"),
    }),
  ).toBeTruthy();
  expect(
    await findByRole("menuitem", { name: i18n.t("feed.sort.name") + " " + i18n.t("sorting.desc") }),
  ).toBeTruthy();
  expect(
    await findByRole("menuitem", { name: i18n.t("feed.sort.date") + " " + i18n.t("sorting.asc") }),
  ).toBeTruthy();
  expect(
    await findAllByRole("menuitem", {
      name: i18n.t("feed.sort.date") + " " + i18n.t("sorting.desc"),
    }),
  ).toBeTruthy();
}, 10000);
