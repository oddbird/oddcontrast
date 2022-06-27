import { fireEvent, render } from '@testing-library/svelte';
import Color from 'colorjs.io';
import { get, writable } from 'svelte/store';

import Header from '$lib/components/colors/Header.svelte';

describe('Header', () => {
  it('updates color (but not space) on input', async () => {
    const color = writable(new Color('hsl(1 2% 3%)'));
    const space = writable('hsl');
    const { getByLabelText } = render(Header, {
      type: 'bg',
      color,
      space,
    });
    const input = getByLabelText('Background Color');
    await fireEvent.focus(input);
    await fireEvent.input(input, { target: { value: '#fff' } });
    await fireEvent.blur(input);

    expect(get(color).toString()).toEqual('hsl(0 0% 100%)');
    expect(get(space)).toEqual('hsl');
  });

  it('shows error on invalid color', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {
      /* do nothing */
    });
    const color = writable(new Color('hsl(1 2% 3%)'));
    const space = writable('hsl');
    const { getByText, getByLabelText } = render(Header, {
      type: 'fg',
      color,
      space,
    });
    const input = getByLabelText('Foreground Color');
    await fireEvent.focus(input);
    await fireEvent.input(input, { target: { value: 'foo' } });

    expect(getByText('Could not parse input as a valid color.')).toBeVisible();

    await fireEvent.blur(input);

    expect(input).toHaveValue('hsl(1 2% 3%)');
    expect(get(color).toString()).toEqual('hsl(1 2% 3%)');
    expect(get(space)).toEqual('hsl');
  });
});
