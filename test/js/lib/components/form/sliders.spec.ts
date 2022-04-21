import { fireEvent, render } from '@testing-library/svelte';
import { get, writable } from 'svelte/store';

import Sliders from '$lib/components/form/sliders.svelte';
import Color from '$src/vendor/color.esm';

describe('Sliders', () => {
  it('renders editable sliders', async () => {
    const color = writable(new Color('hsl', [0, 0, 0]));
    const { getByLabelText } = render(Sliders, {
      type: 'bg',
      color,
    });
    const sliders = {
      h: getByLabelText('Hue'),
      s: getByLabelText('Saturation'),
      l: getByLabelText('Lightness'),
    };
    await fireEvent.input(sliders.h, { target: { value: '1' } });
    await fireEvent.input(sliders.s, { target: { value: '2' } });
    await fireEvent.input(sliders.l, { target: { value: '3' } });

    expect(get(color).hsl).toEqual([1, 2, 3]);
  });
});
