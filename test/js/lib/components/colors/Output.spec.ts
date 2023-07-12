import { render } from '@testing-library/svelte';
import { serialize, to } from 'colorjs.io/fn';
import type { PlainColorObject } from 'colorjs.io/types/src/color';

import Output from '$lib/components/colors/Output.svelte';
import { ColorSpace } from '$lib/stores';
import { HSL_WHITE, HSL_WHITE_SERIALIZED } from '$test/fixtures';

describe('Output', () => {
  it('renders color in selected format', () => {
    const { getByText } = render(Output, {
      type: 'bg',
      color: HSL_WHITE,
      format: 'hsl',
    });

    expect(getByText(HSL_WHITE_SERIALIZED)).toBeVisible();
  });

  it('renders color in other format', () => {
    const { getByText } = render(Output, {
      type: 'bg',
      color: HSL_WHITE,
      format: 'oklch',
    });

    expect(
      getByText(serialize(to(HSL_WHITE, 'oklch'), { inGamut: false })),
    ).toBeVisible();
  });

  it('renders warning if out of gamut', () => {
    const color: PlainColorObject = {
      space: ColorSpace.get('oklch'),
      coords: [0.01, 0.02, 0],
      alpha: 1,
    };
    const { getByText } = render(Output, {
      type: 'fg',
      color,
      format: 'hsl',
    });

    expect(getByText('out of gamut', { exact: false })).toBeVisible();
  });
});
