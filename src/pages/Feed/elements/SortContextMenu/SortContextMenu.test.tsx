import { test, expect, beforeEach } from "@jest/globals";

import SortContextMenu, { SortContextMenuProps } from ".";

import i18n from "@/i18n";
import { SortActionValues } from "./types";

import { setup } from "@/util/test";

let props = {} as SortContextMenuProps;

beforeEach(() => {
  props = { value: undefined, onChange: jest.fn() };
});

test("sort context renders with correct menu items", async () => {
  const { findByRole, findAllByRole, userEvent } = setup(<SortContextMenu {...props} />);

  expect(props.onChange).toHaveBeenCalledTimes(0);

  await userEvent.click(
    await findByRole("button", { name: i18n.t("sort.word") + " " + i18n.t("menu.pickFromList") }),
  );

  expect(
    await findByRole("menuitem", { name: i18n.t("feed.sort.name") + " " + i18n.t("sort.asc") }),
  ).toBeTruthy();
  expect(
    await findByRole("menuitem", { name: i18n.t("feed.sort.name") + " " + i18n.t("sort.desc") }),
  ).toBeTruthy();
  expect(
    await findByRole("menuitem", { name: i18n.t("feed.sort.date") + " " + i18n.t("sort.asc") }),
  ).toBeTruthy();
  expect(
    await findAllByRole("menuitem", { name: i18n.t("feed.sort.date") + " " + i18n.t("sort.desc") }),
  ).toBeTruthy();

  await userEvent.click(
    await findByRole("menuitem", { name: i18n.t("feed.sort.date") + " " + i18n.t("sort.asc") }),
  );
  expect(props.onChange).toHaveBeenCalledTimes(1);
  expect(props.onChange).toHaveBeenCalledWith(SortActionValues.dateAsc);
}, 10000);
