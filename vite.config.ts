import { fileURLToPath, URL } from 'node:url';

import { sveltekit } from '@sveltejs/kit/vite';
import { NodePackageImporter } from 'sass-embedded';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
        loadPaths: [fileURLToPath(new URL('./src/sass/', import.meta.url))],
        importers: [new NodePackageImporter()],
      },
    },
  },
});
