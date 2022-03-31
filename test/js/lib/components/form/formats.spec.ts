import { render } from '@testing-library/svelte';

import Formats from '$lib/components/form/formats.svelte';

describe('Formats', () => {
  it('shows the background header', () => {
    const { getByText } = render(Formats, { type: 'bg' });

    expect(getByText('Background Color in Additional Formats')).toBeVisible();
  });

  it('shows the foreground header', () => {
    const { getByText } = render(Formats, { type: 'fg' });

    expect(getByText('Foreground Color in Additional Formats')).toBeVisible();
  });
});
