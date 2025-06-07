import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testIgnore: ["./src"],
  use: {
    baseURL: 'http://localhost:3033',
    browserName: 'chromium',
    headless: true,
  },
});

