import { fireEvent, render } from '@testing-library/svelte';
import { get } from 'svelte/store';

import Space from '$lib/components/SpaceSelect.svelte';
import { bg, fg, reset } from '$lib/stores';

describe('Space', () => {
  afterEach(() => {
    reset();
  });

  it('renders editable space select', async () => {
    const { getByLabelText } = render(Space);

    expect(get(bg).space.id).toEqual('oklch');
    expect(get(fg).space.id).toEqual('oklch');

    const select = getByLabelText('Color Format');
    await fireEvent.change(select, { target: { value: 'hsl' } });

    expect(get(bg).space.id).toEqual('hsl');
    expect(get(fg).space.id).toEqual('hsl');
  });
});
