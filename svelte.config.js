import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [vitePreprocess()],

  onwarn: (
    /** @type {{ code: string; }} */ warning,
    /** @type {(...arg: any[]) => void} */ handler,
  ) => {
    if (warning.code === 'vite-plugin-svelte-preprocess-many-dependencies') {
      return;
    }
    handler(warning);
  },

  kit: {
    alias: {
      $src: 'src',
      $test: 'test',
    },
    adapter: adapter(),
    env: {
      publicPrefix: '',
    },
  },
};

export default config;
