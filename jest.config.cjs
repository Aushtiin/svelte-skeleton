module.exports = {
  transform: {
    "^.+\\.svelte$": "<rootDir>/test/svelte-transformer.cjs",
  },
  moduleFileExtensions: ["js", "svelte"],
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/test/**/*.test.js"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
