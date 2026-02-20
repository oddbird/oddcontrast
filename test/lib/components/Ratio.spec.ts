import { render, waitFor } from '@testing-library/svelte';
import { tick } from 'svelte';
import { afterEach, describe, expect, it } from 'vitest';

import Ratio from '$lib/components/ratio/index.svelte';
import { fg, reset } from '$lib/stores';

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

  it('updates ratio when color changes', async () => {
    const { getByText, queryByText, queryAllByText } = render(Ratio);
    fg.update((val) => {
      val.coords = [0.5, 0.5, 0.5];
      return val;
    });
    await tick();

    await waitFor(() => {
      expect(getByText('3.22:1')).toBeVisible();
      expect(queryByText('Pass')).not.toBeNull();
      expect(queryAllByText('Fail')).not.toBeNull();
    });
  });
});
