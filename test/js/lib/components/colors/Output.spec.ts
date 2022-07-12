import { render } from '@testing-library/svelte';
import Color from 'colorjs.io';

import Output from '$lib/components/colors/Output.svelte';

describe('Output', () => {
  it('renders color in selected format', async () => {
    const color = new Color('hsl', [1, 2, 3]);
    const { getByText } = render(Output, {
      type: 'bg',
      color,
      space: 'hsl',
    });

    expect(getByText('hsl(1 2% 3%)')).toBeVisible();
  });

  it('renders color in other format', async () => {
    const color = new Color('hsl', [1, 2, 3]);
    const { getByText } = render(Output, {
      type: 'bg',
      color,
      space: 'oklch',
    });

    expect(getByText(color.to('oklch').toString() as string)).toBeVisible();
  });

  it('renders warning if out of gamut', async () => {
    const color = new Color('oklch', [0.01, 0.02, 0]);
    const { getByText } = render(Output, {
      type: 'fg',
      color,
      space: 'hsl',
    });

    expect(getByText('out of gamut', { exact: false })).toBeVisible();
  });
});
