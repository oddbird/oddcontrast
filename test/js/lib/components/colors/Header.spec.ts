import { render } from '@testing-library/svelte';
import Color from 'colorjs.io';
import { writable } from 'svelte/store';

import Header from '$lib/components/colors/Header.svelte';

describe('Header', () => {
  it('shows the background header', () => {
    const { getByText } = render(Header, {
      type: 'bg',
      color: writable(new Color('hsl(1 2% 3%)')),
      space: writable('hsl'),
    });

    expect(getByText('Background Color')).toBeVisible();
  });

  it('shows the foreground header', () => {
    const { getByText } = render(Header, {
      type: 'fg',
      color: writable(new Color('hsl(1 2% 3%)')),
      space: writable('hsl'),
    });

    expect(getByText('Foreground Color')).toBeVisible();
  });
});
