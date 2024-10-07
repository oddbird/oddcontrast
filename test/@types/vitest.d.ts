import { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unused-vars
    interface Matchers<R = void, T = {}>
      extends TestingLibraryMatchers<typeof expect.stringContaining, R> {}
  }
}
