import { render } from '@testing-library/svelte';

import Page from '$src/routes/+page.svelte';

describe('Page', () => {
  beforeEach((context) => {
    context.result = render(Page);
  });

  it('shows the proper heading', ({ result }) => {
    const { getByText } = result;

    expect(getByText('OddContrast')).toBeInTheDocument();
  });
});
