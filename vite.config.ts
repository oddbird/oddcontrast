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
});
