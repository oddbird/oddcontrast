import { render } from '@testing-library/svelte';
import { serialize, to } from 'colorjs.io/fn';

import Output from '$lib/components/colors/Output.svelte';
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
});
