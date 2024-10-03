import { test, expect, beforeEach } from "@jest/globals";

import { render } from "@testing-library/react";
import Highlight, { HighlightProps } from ".";

let props = {} as HighlightProps;

beforeEach(() => {
  props = {
    children: "This is an example text",
    search: "example text",
  };
});

test("highlights search text", async () => {
  render(
    <p>
      <Highlight {...props} />
    </p>,
  );

  const container = document.querySelector("p");
  const mark = container?.querySelector("mark");
  expect(mark?.textContent).toBe("example text");
});
