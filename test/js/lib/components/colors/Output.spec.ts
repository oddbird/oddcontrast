import { render } from '@testing-library/svelte';
import { ColorSpace, serialize, to } from 'colorjs.io/fn';

import Output from '$lib/components/colors/Output.svelte';
import { HSL_WHITE, HSL_WHITE_SERIALIZED } from '$test/fixtures';

describe('Output', () => {
  it('renders color in selected format', () => {
    const { getByText } = render(Output, {
      type: 'bg',
      color: HSL_WHITE,
      space: 'hsl',
    });

    expect(getByText(HSL_WHITE_SERIALIZED)).toBeVisible();
  });

  it('renders color in other format', () => {
    const { getByText } = render(Output, {
      type: 'bg',
      color: HSL_WHITE,
      space: 'oklch',
    });

    expect(
      getByText(serialize(to(HSL_WHITE, 'oklch'), { inGamut: false })),
    ).toBeVisible();
  });

  it('renders warning if out of gamut', () => {
    const color = { space: ColorSpace.get('oklch'), coords: [0.01, 0.02, 0] };
    const { getByText } = render(Output, {
      type: 'fg',
      color,
      space: 'hsl',
    });

    expect(getByText('out of gamut', { exact: false })).toBeVisible();
  });
});
