import { render } from '@testing-library/svelte';

import Input from '$lib/components/form/input.svelte';

describe('Input', () => {
  it('shows the background header', () => {
    const { getByText } = render(Input, {
      type: 'bg',
      value: 'hsl(1deg 2% 3%)',
    });

    expect(getByText('Background Color')).toBeVisible();
  });

  it('shows the foreground header', () => {
    const { getByText } = render(Input, {
      type: 'fg',
      value: 'hsl(1deg 2% 3%)',
    });

    expect(getByText('Foreground Color')).toBeVisible();
  });
});
