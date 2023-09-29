import { fireEvent, render, waitFor } from '@testing-library/svelte';

import CopyButton from '$lib/components/util/CopyButton.svelte';

describe('Copy Button', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a button', () => {
    const { getByRole } = render(CopyButton, {
      props: { text: 'Copy' },
    });
    const button = getByRole('button');

    expect(button.firstChild).toHaveAttribute('data-icon', 'clipboard');
  });

  it('copies content', async () => {
    const spy = vi.spyOn(navigator.clipboard, 'writeText');
    const { getByRole } = render(CopyButton, {
      props: { text: 'Copy' },
    });
    const button = getByRole('button');

    expect(button.firstChild).toHaveAttribute('data-icon', 'clipboard');

    await fireEvent.click(button);

    expect(spy).toHaveBeenCalledWith('Copy');
  });

  it('swaps icons', async () => {
    const { getByRole } = render(CopyButton, {
      props: { text: 'Copy' },
    });
    const button = getByRole('button');

    expect(button.firstChild).toHaveAttribute('data-icon', 'clipboard');

    await fireEvent.click(button);

    expect(button.firstChild).toHaveAttribute('data-icon', 'copy');

    vi.runAllTimers();
    await waitFor(() => {
      expect(button.firstChild).toHaveAttribute('data-icon', 'clipboard');
    });
  });
});
