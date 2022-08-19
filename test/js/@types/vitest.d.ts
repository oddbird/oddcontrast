import { Queries } from '@testing-library/dom';
import { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import { RenderResult } from '@testing-library/svelte';
import type { SvelteComponent } from 'svelte/types/runtime';

declare module 'vitest' {
  export interface TestContext {
    result: RenderResult<SvelteComponent, Queries>;
  }
}

declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-unused-vars, @typescript-eslint/ban-types
    interface Matchers<R = void, T = {}>
      extends TestingLibraryMatchers<typeof expect.stringContaining, R> {}
  }
}
