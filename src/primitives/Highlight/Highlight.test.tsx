import { test, expect } from "@jest/globals";

import { render } from "@testing-library/react";
import Highlight, { HighlightProps } from ".";
import { Typography } from "@mui/material";

const createProps = ({ search, children }: HighlightProps): HighlightProps => ({
  search,
  children,
});

test("highlights search text", async () => {
  let search = "";
  const text = "This is an example text";
  const { rerender } = render(
    <Typography>
      <Highlight {...createProps({ search, children: text })} />
    </Typography>,
  );

  let container = document.querySelector("p");
  let mark = container?.querySelector("mark");
  expect(mark).toBeFalsy();

  search = "example text";
  rerender(
    <Typography>
      <Highlight {...createProps({ search, children: text })} />
    </Typography>,
  );

  container = document.querySelector("p");
  mark = container?.querySelector("mark");
  expect(mark?.textContent).toBe(search);
});
