import { render, type RenderResult } from '@testing-library/svelte';

import Page from '$src/routes/+page.svelte';

interface TestContext {
  result: RenderResult<Page>;
}

describe('Page', () => {
  beforeEach<TestContext>((context) => {
    context.result = render(Page);
  });

  it<TestContext>('shows the proper heading', ({ result }) => {
    const { getByText } = result;

    expect(getByText('OddContrast')).toBeInTheDocument();
  });
});
