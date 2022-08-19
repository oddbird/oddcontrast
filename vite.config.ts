/// <reference types="vitest" />
/// <reference types="@sveltejs/kit/types" />

import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      $src: path.resolve('./src'),
      $test: path.resolve('./test/js'),
    },
  },
  plugins: [sveltekit()],
  /**
   * @see https://vitest.dev/config/#configuration
   */
  test: {
    include: ['./test/js/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    globals: true,
    environment: 'jsdom',
    watch: false,
    setupFiles: './test/js/setup.js',
    clearMocks: true,
    reporters: 'dot',
    coverage: {
      enabled: true,
      reporter: ['text-summary', 'html'],
      include: ['src/**/*.{js,ts,svelte}'],
      exclude: [
        'src/**/*.d.ts',
        'src/routes/docs/**/*',
        'src/routes/+layout.*',
      ],
      all: true,
      skipFull: true,
      lines: 90,
      functions: 90,
      branches: 50, // Seems to be a bug in Svelte component branch coverage
      statements: 90,
    },
  },
});
