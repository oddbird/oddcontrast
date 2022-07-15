import '@testing-library/jest-dom';
import '$lib/utils/initColors';

beforeAll(() => {
  globalThis.CSS.supports = () => true;
});
