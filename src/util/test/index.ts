import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactNode } from "react";

export function setup(jsx: ReactNode) {
  return {
    userEvent: userEvent.setup(),
    ...render(jsx),
  };
}
