import '@testing-library/jest-dom';
import '$lib/utils/initColors';

import { vi } from 'vitest';

// https://github.com/sveltejs/kit/issues/5879
vi.mock('$app/env', () => {
  return {
    browser: true,
    dev: false,
  };
});

beforeAll(() => {
  window.CSS.supports = () => true;
});
