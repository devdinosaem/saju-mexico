import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      'manseryeok': path.resolve(__dirname, '../manseryeok/src/index.ts'),
      'saju-engine': path.resolve(__dirname, '../saju-engine/src/index.ts'),
    },
  },
  test: {
    testTimeout: 120_000,
  },
});
