import { describe, expect, it } from "@jest/globals";
import { assignDefault } from "../object";

describe("object module", () => {
  it.each([
    [{ name: "John", age: 10 }, {}, { name: "John", age: 10 }],
    [{ name: "John", age: 10 }, { email: "test@exampe.com" }, { name: "John", age: 10 }],
    [{ name: "John", age: 10 }, { name: undefined }, { name: "John", age: 10 }],
    [{ name: "John", age: 10 }, { name: null }, { name: null, age: 10 }],
    [
      { name: "John", age: 10 },
      { name: "Silver", age: 25 },
      { name: "Silver", age: 25 },
    ],
  ])("assigns default values from a source object", (target, source, expected) =>
    // @ts-ignore
    expect(assignDefault(target, source)).toEqual(expected),
  );
});
