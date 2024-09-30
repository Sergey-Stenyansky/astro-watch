/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/?(*.)+(spec|ttt).+(ts|tsx|js)"],
  transformIgnorePatterns: ["/node_modules/"],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  testEnvironment: "jsdom",
};
