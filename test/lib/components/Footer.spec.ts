import { render } from '@testing-library/svelte';
import MockDate from 'mockdate';
import { afterEach, describe, expect, it } from 'vitest';

import Footer from '$lib/components/Footer.svelte';

describe('Footer', () => {
  afterEach(() => {
    MockDate.reset();
  });

  it('shows the copyright year (current year)', () => {
    MockDate.set('2022-04-01');
    const { getByText } = render(Footer);

    expect(getByText('© 2022 OddBird.', { exact: false })).toBeVisible();
  });

  it('shows the copyright year (range of years)', () => {
    MockDate.set('2023-04-01');
    const { getByText } = render(Footer);

    expect(getByText('© 2022–2023 OddBird.', { exact: false })).toBeVisible();
  });
});
