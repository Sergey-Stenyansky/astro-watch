import { test, expect } from "@jest/globals";

import { render, fireEvent } from "@testing-library/react";
import CheckboxGroup, { CheckboxGroupProps } from ".";

import { CheckboxGroupItem } from "./types";

const createItems = (values: string[]): CheckboxGroupItem[] => {
  return [
    { name: "test 1", value: Boolean(values.find((v) => v === "test 1")), label: "test 1" },
    { name: "test 2", value: Boolean(values.find((v) => v === "test 2")), label: "test 2" },
    { name: "test 3", value: Boolean(values.find((v) => v === "test 3")), label: "test 3" },
  ];
};

const createProps = ({
  onToggle,
  groupValue,
}: Partial<CheckboxGroupProps> & {
  onToggle: (value: string) => void;
  groupValue: string;
}): CheckboxGroupProps => ({
  onToggle,
  items: createItems([groupValue]),
});

test("checkbox toggles its state on click", async () => {
  let groupValue = "";
  const onToggle = (value: string) => (groupValue = value);
  const { findByRole, rerender } = render(
    <CheckboxGroup {...createProps({ onToggle, groupValue })} />,
  );

  const firstVariant = (await findByRole("checkbox", { name: "test 1" })) as HTMLInputElement;
  fireEvent(firstVariant, new MouseEvent("click", { bubbles: true }));
  rerender(<CheckboxGroup {...createProps({ onToggle, groupValue })} />);
  expect(firstVariant).toHaveProperty("checked", true);

  const secondVariant = (await findByRole("checkbox", { name: "test 2" })) as HTMLInputElement;
  fireEvent(secondVariant, new MouseEvent("click", { bubbles: true }));
  rerender(<CheckboxGroup {...createProps({ onToggle, groupValue })} />);
  expect(secondVariant).toHaveProperty("checked", true);

  const thirdVariant = (await findByRole("checkbox", { name: "test 3" })) as HTMLInputElement;
  fireEvent(thirdVariant, new MouseEvent("click", { bubbles: true }));
  rerender(<CheckboxGroup {...createProps({ onToggle, groupValue })} />);
  expect(thirdVariant).toHaveProperty("checked", true);
});
