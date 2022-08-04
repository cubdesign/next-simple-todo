import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  // Look for test files in the "tests" directory, relative to this configuration file
  testDir: "e2e",

  use: {
    // Configure browser and context here
    baseURL: "http://localhost:3000",
  },
};
export default config;
