import { fileURLToPath, URL } from 'node:url';

import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { NodePackageImporter } from 'sass-embedded';
import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit(), svelteTesting()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
        loadPaths: [fileURLToPath(new URL('./src/sass/', import.meta.url))],
        importers: [new NodePackageImporter()],
      },
    },
  },
  test: {
    include: ['./test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    globals: true,
    environment: 'jsdom',
    watch: false,
    setupFiles: './test/setup.ts',
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
        ...coverageConfigDefaults.exclude,
      ],
      all: true,
      skipFull: true,
      reportOnFailure: true,
    },
  },
});
