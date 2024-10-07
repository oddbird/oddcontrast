import '@testing-library/jest-dom';

beforeAll(() => {
  window.CSS.supports = () => true;
  // @ts-expect-error Clipboard isn't writable...
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  window.navigator.clipboard = { writeText: () => {} };
});
