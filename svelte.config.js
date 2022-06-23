import adapter from '@sveltejs/adapter-auto';
import path from 'path';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    scss: {
      includePaths: [path.resolve('./src/sass/')],
    },
  }),

  kit: {
    adapter: adapter(),
    vite: {
      resolve: {
        alias: {
          $src: path.resolve('./src'),
        },
      },
      // https://github.com/LeaVerou/color.js/issues/155
      ssr: {
        noExternal: ['colorjs.io'],
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
          lines: 100,
          functions: 100,
          branches: 50, // Seems to be a bug in Svelte component branch coverage
          statements: 100,
        },
      },
    },
  },
};

export default config;
