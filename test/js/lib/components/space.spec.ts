import { fireEvent, render } from '@testing-library/svelte';
import { get } from 'svelte/store';

import Space from '$lib/components/space.svelte';
import { bg, fg, reset } from '$lib/stores';

describe('Space', () => {
  afterEach(() => {
    reset();
  });

  it('renders editable space select', async () => {
    const { getByLabelText } = render(Space);

    expect(get(bg).spaceId).toEqual('oklch');
    expect(get(fg).spaceId).toEqual('oklch');

    const select = getByLabelText('Color Format');
    await fireEvent.change(select, { target: { value: 'hsl' } });

    expect(get(bg).spaceId).toEqual('hsl');
    expect(get(fg).spaceId).toEqual('hsl');
  });
});
