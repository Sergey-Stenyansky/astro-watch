/** @type {import('ts-jest').JestConfigWithTsJest} **/

export default {
  testEnvironment: "jest-environment-jsdom",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/?(*.)+(spec|ttt|test).+(ts|tsx|js)"],
  transformIgnorePatterns: ["/node_modules/"],
  transform: {
    "^.+.tsx?$": ["ts-jest", { tsconfig: "tsconfig.app.json" }],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  globals: {
    "ts-jest": {
      diagnostics: false,
    },
  },
};
