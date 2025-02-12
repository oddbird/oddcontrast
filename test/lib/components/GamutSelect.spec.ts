import { fireEvent, render } from '@testing-library/svelte';
import { get } from 'svelte/store';

import Gamut from '$lib/components/GamutSelect.svelte';
import { gamut, INITIAL_VALUES, reset } from '$lib/stores';

describe('Space', () => {
  afterEach(() => {
    reset();
  });

  it('renders editable gamut select', async () => {
    const { getByLabelText } = render(Gamut);

    expect(get(gamut)).toBe(INITIAL_VALUES.gamut);

    const select = getByLabelText('Show Gamut');
    await fireEvent.change(select, { target: { value: 'rec2020' } });

    expect(get(gamut)).toBe('rec2020');
  });
});
