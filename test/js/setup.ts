import '@testing-library/jest-dom';

beforeAll(() => {
  globalThis.CSS.supports = () => true;
});
