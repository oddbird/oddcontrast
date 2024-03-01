/// <reference types="vitest" />

import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import { NodePackageImporter } from 'sass';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [path.resolve('./src/sass/')],
        pkgImporter: new NodePackageImporter('.'),
      },
    },
  },
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
        'src/routes/styleguide/**/*',
        'src/routes/+layout.*',
      ],
      all: true,
      skipFull: true,
      reportOnFailure: true,
    },
  },
});
