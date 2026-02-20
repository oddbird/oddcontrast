import '@testing-library/jest-dom/vitest';

import { beforeAll } from 'vitest';

beforeAll(() => {
  window.CSS.supports = () => true;
  // @ts-expect-error Clipboard isn't writable...
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  window.navigator.clipboard = { writeText: () => {} };
  // @ts-expect-error Allow partial MediaQueryList response
  window.matchMedia = () => ({ matches: true });
});
