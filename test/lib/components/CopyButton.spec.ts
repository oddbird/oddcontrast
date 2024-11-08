import { fireEvent, render, waitFor } from '@testing-library/svelte';

import CopyButton from '$lib/components/util/CopyButton.svelte';

function getFirstNonCommentChild(node: Node) {
  return [...node.childNodes].find((x) => x.nodeType !== Node.COMMENT_NODE);
}

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

    expect(getFirstNonCommentChild(button)).toHaveAttribute(
      'data-icon',
      'clipboard',
    );
  });

  it('copies content', async () => {
    const spy = vi.spyOn(navigator.clipboard, 'writeText');
    const { getByRole } = render(CopyButton, {
      props: { text: 'Copy' },
    });
    const button = getByRole('button');

    expect(getFirstNonCommentChild(button)).toHaveAttribute(
      'data-icon',
      'clipboard',
    );

    await fireEvent.click(button);

    expect(spy).toHaveBeenCalledWith('Copy');
  });

  it('swaps icons', async () => {
    const { getByRole } = render(CopyButton, {
      props: { text: 'Copy' },
    });
    const button = getByRole('button');

    expect(getFirstNonCommentChild(button)).toHaveAttribute(
      'data-icon',
      'clipboard',
    );

    await fireEvent.click(button);

    expect(getFirstNonCommentChild(button)).toHaveAttribute(
      'data-icon',
      'copy',
    );

    vi.runAllTimers();
    await waitFor(() => {
      expect(getFirstNonCommentChild(button)).toHaveAttribute(
        'data-icon',
        'clipboard',
      );
    });
  });
});
