import { fireEvent, render } from '@testing-library/svelte';
import { get, writable } from 'svelte/store';

import Sliders from '$lib/components/colors/Sliders.svelte';
import { HSL_WHITE } from '$test/fixtures';

describe('Sliders', () => {
  it('renders editable sliders', async () => {
    const color = writable(HSL_WHITE);
    const { getByLabelText } = render(Sliders, {
      type: 'bg',
      color,
      format: 'hsl',
    });
    const sliders = {
      h: getByLabelText('Hue'),
      s: getByLabelText('Saturation'),
      l: getByLabelText('Lightness'),
    };
    await fireEvent.input(sliders.h, { target: { value: '1' } });
    await fireEvent.input(sliders.s, { target: { value: '2' } });
    await fireEvent.input(sliders.l, { target: { value: '3' } });

    expect(get(color).coords).toEqual([1, 2, 3]);
  });
});
