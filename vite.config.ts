import { fileURLToPath, URL } from 'node:url';

import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite';
import { NodePackageImporter } from 'sass-embedded';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    sveltekit({
      // Consult https://kit.svelte.dev/docs/integrations#preprocessors
      // for more information about preprocessors
      preprocess: [vitePreprocess()],
      adapter: adapter(),
      onwarn: (warning, handler) => {
        if (
          warning.code === 'vite-plugin-svelte-preprocess-many-dependencies'
        ) {
          return;
        }

        handler(warning);
      },
    }),
    svelteTesting(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [fileURLToPath(new URL('./src/sass/', import.meta.url))],
        importers: [new NodePackageImporter()],
      },
    },
  },
  test: {
    include: ['./test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    environment: 'jsdom',
    pool: 'vmThreads',
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
      ],
      skipFull: true,
      reportOnFailure: true,
    },
  },
});
