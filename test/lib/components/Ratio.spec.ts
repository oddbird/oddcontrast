import { render } from '@testing-library/svelte';

import Ratio from '$lib/components/ratio/index.svelte';
import { reset } from '$lib/stores';

describe('Ratio', () => {
  afterEach(() => {
    reset();
  });

  it('displays passing/failing ratio', () => {
    const { getByText, queryAllByText, queryByText } = render(Ratio);

    expect(getByText('7.09:1')).toBeVisible();
    expect(queryAllByText('Pass')).not.toBeNull();
    expect(queryByText('Fail')).toBeNull();
  });
});
