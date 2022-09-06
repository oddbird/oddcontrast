import '@testing-library/jest-dom';

import { vi } from 'vitest';

// https://github.com/sveltejs/kit/issues/6259
vi.mock('$app/environment', () => {
  return {
    browser: true,
    dev: false,
  };
});

beforeAll(() => {
  window.CSS.supports = () => true;
});
