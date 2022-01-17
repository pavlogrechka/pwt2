import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  globalSetup: require.resolve("./global-setup"),
  use: {
    // Tell all tests to load signed-in state from 'storageState.json'.
    storageState: "storageState.json",
    headless: !true,
    browserName: "chromium",
    screenshot: "on",
    video: "on",
    trace: "on",
  },
  retries: 0,
  reporter: [
    ["dot"],
    ["json", { outputFile: "test-result.json" }],
    [
      "html",
      {
        open: "never",
      },
    ],
  ],
};
export default config;
