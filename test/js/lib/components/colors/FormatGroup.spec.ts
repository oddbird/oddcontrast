import { render } from '@testing-library/svelte';

import FormatGroup from '$lib/components/colors/FormatGroup.svelte';
import { FORMAT_GROUPS } from '$src/lib/constants';
import { HSL_WHITE, OUT_OF_BOUNDED_GAMUTS } from '$test/fixtures';

describe('FormatGroup', () => {
  it('renders selected group', () => {
    const GROUP_NAME = 'sRGB Formats';
    const { getByTestId, getByText } = render(FormatGroup, {
      type: 'bg',
      color: HSL_WHITE,
      name: GROUP_NAME,
      formats: FORMAT_GROUPS[GROUP_NAME]!,
    });

    expect(getByText(GROUP_NAME)).toBeVisible();
    FORMAT_GROUPS[GROUP_NAME]?.forEach((format) => {
      expect(getByTestId(`format-${format}`)).toBeVisible();
    });
  });

  it('renders warning if out of gamut', () => {
    const GROUP_NAME = 'sRGB Formats';
    const { getByTestId, getByText } = render(FormatGroup, {
      type: 'bg',
      color: OUT_OF_BOUNDED_GAMUTS,
      name: GROUP_NAME,
      formats: FORMAT_GROUPS[GROUP_NAME]!,
    });

    expect(getByText(GROUP_NAME)).toBeVisible();
    FORMAT_GROUPS[GROUP_NAME]?.forEach((format) => {
      expect(getByTestId(`format-${format}`)).toBeVisible();
    });
    expect(getByText('outside the sRGB gamut.')).toBeVisible();
  });
});
