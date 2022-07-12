import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $src: path.resolve('./src'),
    },
  },
  test: {
    include: ['./test/js/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    globals: true,
    environment: 'jsdom',
    watch: false,
    setupFiles: './test/js/setup.ts',
    clearMocks: true,
    reporters: 'dot',
    coverage: {
      enabled: true,
      reporter: ['text-summary', 'html'],
      include: ['src/**/*.{js,ts,svelte}'],
      exclude: [
        'src/**/*.d.ts',
        'src/routes/docs.ts',
        'src/routes/__layout.svelte',
      ],
      all: true,
      skipFull: true,
      lines: 90,
      functions: 90,
      branches: 50, // Seems to be a bug in Svelte component branch coverage
      statements: 90,
    },
  },
};

export default config;
