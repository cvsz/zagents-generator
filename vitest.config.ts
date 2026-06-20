// SPDX-License-Identifier: MIT
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: false,
    environment: 'node',
    testTimeout: 60000,
    hookTimeout: 60000,
    include: [
      'packages/*/__tests__/**/*.test.ts',
      'packages/*/__tests__/integration/**/*.test.ts',
      '__tests__/**/*.test.ts',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['packages/*/src/**'],
      exclude: ['packages/*/dist/**', 'packages/*/templates/**'],
    },
  },
});
