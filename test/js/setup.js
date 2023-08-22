import '@testing-library/jest-dom';

beforeAll(() => {
  window.CSS.supports = () => true;
  window.navigator.clipboard = { writeText: () => {} };
});
