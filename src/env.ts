import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
  CONTEXT: { public: true, static: true },
});
