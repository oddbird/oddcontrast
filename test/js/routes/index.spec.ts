import { render, RenderResult } from '@testing-library/svelte';

import Index from '$src/routes/index.svelte';

describe('Index', () => {
  let result: RenderResult;

  beforeEach(() => {
    result = render(Index);
  });

  it('shows the proper heading', () => {
    const { getByText } = result;

    expect(getByText('OddContrast')).toBeInTheDocument();
  });
});
