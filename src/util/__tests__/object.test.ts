import { describe, expect, it } from "@jest/globals";
import { assignDefault } from "../object";

describe("object module", () => {
  describe("assign default function", () => {
    it("assigns default values from an empty source object", () => {
      expect(assignDefault({ name: "John", age: 10 }, {})).toEqual({ name: "John", age: 10 });
    });
    it("assigns default values from a source object with unmatching keys", () => {
      //@ts-ignore
      expect(assignDefault({ name: "John", age: 10 }, { email: "test@exampe.com" })).toEqual({
        name: "John",
        age: 10,
      });
    });
    it("assigns default values from a source object with undefined keys", () => {
      //@ts-ignore
      expect(assignDefault({ name: "John", age: 10 }, { name: undefined })).toEqual({
        name: "John",
        age: 10,
      });
    });
    it("assigns default values from a source object with a null value as a default", () => {
      //@ts-ignore
      expect(assignDefault({ name: "John", age: 10 }, { name: null })).toEqual({
        name: null,
        age: 10,
      });
    });
    it("assigns default values from a source object", () => {
      //@ts-ignore
      expect(assignDefault({ name: "John", age: 10 }, { name: "Silver", age: 25 })).toEqual({
        name: "Silver",
        age: 25,
      });
    });
  });
});
