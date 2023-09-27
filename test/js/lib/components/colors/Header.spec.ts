import { fireEvent, render } from '@testing-library/svelte';
import { HSL } from 'colorjs.io/fn';
import { get, writable } from 'svelte/store';

import Header from '$lib/components/colors/Header.svelte';
import { HSL_WHITE, HSL_WHITE_SERIALIZED } from '$test/fixtures';

describe('Header', () => {
  it('updates color (but not space) on input', async () => {
    const color = writable(HSL_WHITE);
    const { getByLabelText } = render(Header, {
      type: 'bg',
      color,
      premultipliedFg: HSL_WHITE,
      format: 'hsl',
    });
    const input = getByLabelText('Background Color');
    await fireEvent.focus(input);
    await fireEvent.input(input, { target: { value: 'red' } });
    await fireEvent.blur(input);
    const actual = get(color);

    expect(actual.space).toEqual(HSL);
    expect(actual.coords).toEqual([0, 100, 50]);
  });

  it('shows error on invalid color', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {
      /* do nothing */
    });
    const color = writable(HSL_WHITE);
    const { getByText, getByLabelText } = render(Header, {
      type: 'fg',
      color,
      premultipliedFg: HSL_WHITE,
      format: 'hsl',
    });
    const input = getByLabelText('Foreground Color');
    await fireEvent.focus(input);
    await fireEvent.input(input, { target: { value: 'foo' } });

    expect(getByText('Could not parse input as a valid color.')).toBeVisible();

    await fireEvent.blur(input);
    const actual = get(color);

    expect(input).toHaveValue(HSL_WHITE_SERIALIZED);
    expect(actual).toEqual(HSL_WHITE);
  });

  describe('on enter', () => {
    it('blurs input', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => {
        /* do nothing */
      });
      const color = writable(HSL_WHITE);
      const { getByText, getByLabelText } = render(Header, {
        type: 'fg',
        color,
        premultipliedFg: HSL_WHITE,
        format: 'hsl',
      });
      const input = getByLabelText('Foreground Color');
      await fireEvent.focus(input);
      await fireEvent.input(input, { target: { value: 'foo' } });

      expect(
        getByText('Could not parse input as a valid color.'),
      ).toBeVisible();

      vi.spyOn(input, 'blur');
      await fireEvent.keyDown(input, { key: 'Enter' });

      expect(input.blur).toHaveBeenCalledTimes(1);
    });
  });

  describe('on escape', () => {
    it('blurs input', async () => {
      const color = writable(HSL_WHITE);
      const { getByLabelText } = render(Header, {
        type: 'fg',
        color,
        premultipliedFg: HSL_WHITE,
        format: 'hsl',
      });
      const input = getByLabelText('Foreground Color');
      await fireEvent.focus(input);
      await fireEvent.input(input, { target: { value: 'red' } });

      vi.spyOn(input, 'blur');
      await fireEvent.keyDown(input, { key: 'Esc' });
      const actual = get(color);

      expect(input.blur).toHaveBeenCalledTimes(1);
      expect(actual.space).toEqual(HSL);
      expect(actual.coords).toEqual([0, 100, 50]);
    });
  });
});
