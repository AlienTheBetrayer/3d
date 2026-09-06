import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    passWithNoTests: true,
    projects: [
      {
        plugins: [swc.vite()],
        test: {
          name: 'api',
          root: './apps/api',
          include: ['src/**/*.spec.ts'],
          environment: 'node',
        },
      },
      {
        test: {
          name: 'web',
          root: './apps/web',
          include: ['**/*.{spec,test}.{ts,tsx}'],
          environment: 'jsdom',
        },
      },
    ],
  },
});
