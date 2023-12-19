import { render } from '@testing-library/svelte';

import FormatGroup from '$lib/components/colors/FormatGroup.svelte';
import { FORMAT_GROUPS } from '$src/lib/constants';
import { HSL_WHITE, OUT_OF_BOUNDED_GAMUTS } from '$test/fixtures';

describe('FormatGroup', () => {
  it('renders selected group', () => {
    const FORMAT_GROUP = FORMAT_GROUPS[0]!;
    const { getByTestId, getByText } = render(FormatGroup, {
      type: 'bg',
      color: HSL_WHITE,
      formatGroup: FORMAT_GROUP,
    });

    expect(getByText(FORMAT_GROUP.name)).toBeVisible();
    FORMAT_GROUP.formats.forEach((format) => {
      expect(getByTestId(`format-${format}`)).toBeVisible();
    });
  });

  it('renders warning if out of gamut', () => {
    const FORMAT_GROUP = FORMAT_GROUPS[0]!;
    const { getByTestId, getByText } = render(FormatGroup, {
      type: 'bg',
      color: OUT_OF_BOUNDED_GAMUTS,
      formatGroup: FORMAT_GROUP,
    });

    expect(getByText(FORMAT_GROUP.name)).toBeVisible();
    FORMAT_GROUP.formats.forEach((format) => {
      expect(getByTestId(`format-${format}`)).toBeVisible();
    });
    expect(getByText('outside the sRGB gamut.')).toBeVisible();
  });
});
