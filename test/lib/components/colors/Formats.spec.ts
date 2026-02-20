import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import Formats from '$lib/components/colors/Formats.svelte';
import { HSL_WHITE } from '$test/fixtures';

describe('Formats', () => {
  it('shows the background header', () => {
    const { getByText } = render(Formats, {
      type: 'bg',
      color: HSL_WHITE,
      format: 'hsl',
    });

    expect(getByText('Background Color')).toBeVisible();
  });

  it('shows the foreground header', () => {
    const { getByText } = render(Formats, {
      type: 'fg',
      color: HSL_WHITE,
      format: 'hsl',
    });

    expect(getByText('Foreground Color')).toBeVisible();
  });
});
