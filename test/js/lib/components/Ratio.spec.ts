import { render } from '@testing-library/svelte';

import Ratio from '$lib/components/ratio/index.svelte';
import { reset } from '$lib/stores';

describe('Ratio', () => {
  afterEach(() => {
    reset();
  });

  it('displays passing/failing ratio', () => {
    const { getByText, queryAllByText } = render(Ratio);

    expect(getByText('5.77:1')).toBeVisible();
    expect(queryAllByText('Pass')).not.toBeNull();
    expect(getByText('Fail')).toBeVisible();
  });
});
