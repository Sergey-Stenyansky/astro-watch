import { test, expect, beforeEach } from "@jest/globals";

import CheckboxGroup, { CheckboxGroupProps } from ".";

import { CheckboxGroupItem } from "./types";
import { setup } from "@/util/test";

const createItems = (values: string[]): CheckboxGroupItem[] => {
  return [
    { name: "test 1", value: Boolean(values.find((v) => v === "test 1")), label: "test 1" },
    { name: "test 2", value: Boolean(values.find((v) => v === "test 2")), label: "test 2" },
    { name: "test 3", value: Boolean(values.find((v) => v === "test 3")), label: "test 3" },
  ];
};

let props = {} as CheckboxGroupProps;

beforeEach(() => {
  props = {
    onToggle: jest.fn(),
    items: createItems([]),
    label: "Test Label",
  };
});

test("checkbox group toggles its state on click", async () => {
  const { findByRole, userEvent, rerender } = setup(<CheckboxGroup {...props} />);

  expect(props.onToggle).toHaveBeenCalledTimes(0);
  expect(await findByRole("checkbox", { name: "test 1" })).toHaveProperty("checked", false);
  expect(await findByRole("checkbox", { name: "test 2" })).toHaveProperty("checked", false);
  expect(await findByRole("checkbox", { name: "test 3" })).toHaveProperty("checked", false);

  await userEvent.click(await findByRole("checkbox", { name: "test 1" }));
  expect(props.onToggle).toHaveBeenCalledTimes(1);
  expect(props.onToggle).toHaveBeenCalledWith("test 1");

  await userEvent.click(await findByRole("checkbox", { name: "test 2" }));
  expect(props.onToggle).toHaveBeenCalledTimes(2);
  expect(props.onToggle).toHaveBeenCalledWith("test 2");

  await userEvent.click(await findByRole("checkbox", { name: "test 3" }));
  expect(props.onToggle).toHaveBeenCalledTimes(3);
  expect(props.onToggle).toHaveBeenCalledWith("test 3");

  rerender(<CheckboxGroup {...props} items={createItems(["test 1", "test 3"])} />);
  expect(props.onToggle).toHaveBeenCalledTimes(3);
  expect(await findByRole("checkbox", { name: "test 1" })).toHaveProperty("checked", true);
  expect(await findByRole("checkbox", { name: "test 2" })).toHaveProperty("checked", false);
  expect(await findByRole("checkbox", { name: "test 3" })).toHaveProperty("checked", true);
});
