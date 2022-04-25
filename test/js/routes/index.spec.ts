import { render } from '@testing-library/svelte';

import Index from '$src/routes/index.svelte';

describe('Index', () => {
  beforeEach((context) => {
    context.result = render(Index);
  });

  it('shows the proper heading', ({ result }) => {
    const { getByText } = result;

    expect(getByText('OddContrast')).toBeInTheDocument();
  });
});
