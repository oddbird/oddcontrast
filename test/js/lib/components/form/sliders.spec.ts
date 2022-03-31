import { fireEvent, render } from '@testing-library/svelte';
import { get, writable } from 'svelte/store';

import Sliders from '$lib/components/form/sliders.svelte';

describe('Sliders', () => {
  it('renders editable sliders', async () => {
    const h = writable(0);
    const s = writable(0);
    const l = writable(0);
    const { getByLabelText } = render(Sliders, {
      type: 'bg',
      h,
      s,
      l,
    });
    const sliders = {
      h: getByLabelText('Hue'),
      s: getByLabelText('Saturation'),
      l: getByLabelText('Lightness'),
    };
    await fireEvent.change(sliders.h, { target: { value: '1' } });
    await fireEvent.change(sliders.s, { target: { value: '2' } });
    await fireEvent.change(sliders.l, { target: { value: '3' } });

    expect(get(h)).toBe(1);
    expect(get(s)).toBe(2);
    expect(get(l)).toBe(3);
  });
});
