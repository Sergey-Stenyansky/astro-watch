import { test, expect } from "@jest/globals";

import { render, fireEvent } from "@testing-library/react";
import Checkbox, { CheckboxProps } from ".";

const createProps = ({
  checked,
  onChange,
}: Partial<CheckboxProps> & { onChange: (value: boolean) => void }): CheckboxProps => ({
  onChange,
  checked,
});

test("checkbox toggles its state on click", async () => {
  let checked = false;
  const onChange = (value: boolean) => (checked = value);
  const { findByRole, rerender } = render(<Checkbox {...createProps({ checked, onChange })} />);

  const element = (await findByRole("checkbox")) as HTMLInputElement;
  expect(element).toHaveProperty("checked", false);

  fireEvent(element, new MouseEvent("click", { bubbles: true }));
  rerender(<Checkbox {...createProps({ checked, onChange })} />);
  expect(element).toHaveProperty("checked", true);

  fireEvent(element, new MouseEvent("click", { bubbles: true }));
  rerender(<Checkbox {...createProps({ checked, onChange })} />);
  expect(element).toHaveProperty("checked", false);
});
