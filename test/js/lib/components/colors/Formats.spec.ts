import { render } from '@testing-library/svelte';
import Color from 'colorjs.io';

import Formats from '$lib/components/colors/Formats.svelte';

describe('Formats', () => {
  it('shows the background header', () => {
    const { getByText } = render(Formats, {
      type: 'bg',
      color: new Color('hsl(1 2% 3%)'),
      space: 'hsl',
    });

    expect(getByText('Background Color')).toBeVisible();
  });

  it('shows the foreground header', () => {
    const { getByText } = render(Formats, {
      type: 'fg',
      color: new Color('hsl(1 2% 3%)'),
      space: 'hsl',
    });

    expect(getByText('Foreground Color')).toBeVisible();
  });
});
