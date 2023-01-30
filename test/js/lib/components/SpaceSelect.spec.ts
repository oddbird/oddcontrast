import { fireEvent, render } from '@testing-library/svelte';
import { get } from 'svelte/store';

import Space from '$lib/components/SpaceSelect.svelte';
import { bg, ColorSpace, fg, reset } from '$lib/stores';

describe('Space', () => {
  afterEach(() => {
    reset();
  });

  it('renders editable space select', async () => {
    const { getByLabelText } = render(Space);

    expect((get(bg).space as ColorSpace).id).toBe('oklch');
    expect((get(fg).space as ColorSpace).id).toBe('oklch');

    const select = getByLabelText('Color Format');
    await fireEvent.change(select, { target: { value: 'hsl' } });

    expect((get(bg).space as ColorSpace).id).toBe('hsl');
    expect((get(fg).space as ColorSpace).id).toBe('hsl');
  });
});
