import { test, expect, beforeEach } from "@jest/globals";

import Checkbox, { CheckboxProps } from ".";

import { setup } from "@/util/test";

let props = {} as CheckboxProps;

beforeEach(() => {
  props = {
    checked: false,
    onChange: jest.fn(),
    label: "Test Label",
  };
});

test("checkbox toggles its state on click", async () => {
  const { findByRole, rerender, userEvent } = setup(<Checkbox {...props} />);

  expect(await findByRole("checkbox", { name: "Test Label" })).toHaveProperty("checked", false);
  expect(props.onChange).toHaveBeenCalledTimes(0);

  await userEvent.click(await findByRole("checkbox", { name: "Test Label" }));
  expect(props.onChange).toHaveBeenCalledTimes(1);
  expect(props.onChange).toHaveBeenCalledWith(true);

  rerender(<Checkbox {...props} checked={true} />);
  expect(await findByRole("checkbox", { name: "Test Label" })).toHaveProperty("checked", true);

  await userEvent.click(await findByRole("checkbox", { name: "Test Label" }));
  expect(props.onChange).toHaveBeenCalledTimes(2);
  expect(props.onChange).toHaveBeenCalledWith(false);
});
