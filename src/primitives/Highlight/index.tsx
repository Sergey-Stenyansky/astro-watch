import { memo } from "react";

// import { highlightStyle } from "primitives/Highlight/style.css";

export interface HighlightInterface {
  search?: string;
  children: React.ReactNode;
}

const escapeRegExp = (str = "") => str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");

const Highlight = function ({ search, children }: HighlightInterface) {
  if (!search) return <>{children}</>;

  const pattern = new RegExp(`(${escapeRegExp(search)})`, "i");
  const parts = String(children)
    .split(pattern)
    .map((part, index) => (pattern.test(part) ? <mark key={index}>{part}</mark> : part));

  return <>{parts}</>;
};

export default memo(Highlight);
