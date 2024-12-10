<script lang="ts">
  import { onMount } from 'svelte';

  import ExternalLink from '$lib/components/util/ExternalLink.svelte';

  interface Props {
    pass: boolean;
  }

  let { pass }: Props = $props();

  let startOpen = $state(false);
  onMount(() => {
    startOpen = window.matchMedia('(min-width: 80em)').matches;
  });
</script>

<details class="known-issues" open={startOpen} data-pass={pass}>
  <summary>Known Color Issues</summary>
  <dl class="issues-list">
    <dt>Gamut Mapping Implementation</dt>
    <dd>
      <p>
        Browsers implemented gamut mapping using clipping, which is fast but
        provides inferior results compared to the algorithm defined in the <ExternalLink
          href="https://drafts.csswg.org/css-color/#binsearch"
          >CSS Spec</ExternalLink
        >. Until browsers are updated, colors that are out of gamut for your
        screen may be displayed very differently than expected.
      </p>
    </dd>
    <dt>Checking for Out of Gamut Colors</dt>
    <dd>
      <p>
        The new color features in CSS allow for a much wider range of colors,
        many of which cannot be shown on many (or any) screens. When selecting
        colors, consider that most users will see these colors on a display that
        supports the <code>sRGB</code> or <code>P3</code> gamut.
      </p>
      <p>There are two primary ways a color can be out of gamut:</p>
      <ol>
        <li>
          Choosing a color in a space with a wider gamut, especially when a
          channel is near one of the edges of its range.
        </li>
        <li>
          Specifying a channel value that is outside its range. While the
          sliders in this tool set hard boundaries, values outside these
          boundaries are still valid, and can be entered in the text input.
        </li>
      </ol>
      <p>
        When a color is out of gamut for the user's screen, the browser will
        adjust the color to be in gamut.
      </p>
    </dd>
    <dt>Background Color Alpha Values</dt>
    <dd>
      <p>
        WCAG 2 contrast does not consider alpha values. Because we don't know
        what is behind your background color, we can't estimate the contrast. If
        the background color is not opaque, the contrast ratio is computed
        without background or foreground opacity.
      </p>
    </dd>
    <dt>Foreground Color Alpha Values</dt>
    <dd>
      <p>
        WCAG 2 contrast does not consider alpha values, but we can approximate a
        ratio by premultiplying a semi-transparent foreground color in the sRGB
        space. In practice, the displayed foreground color may vary, depending
        on the display and browser.
      </p>
    </dd>
  </dl>
</details>

<style lang="scss">
  @use 'config';
  .known-issues {
    grid-area: knownissues;
    padding: var(--gutter);

    @include config.above('lg-page-break') {
      margin-inline: calc(var(--gutter) * -1);
    }
  }

  summary {
    align-items: center;
    display: grid;
    gap: var(--shim-plus);
    grid-template-columns: max-content var(--triangle-height);
  }

  .issues-list {
    display: grid;
    gap: var(--half-shim);
    grid-auto-rows: auto;
    grid-template-columns: 1fr;
    margin-block-start: var(--gutter);
  }

  dt {
    font-weight: bold;
  }

  dd {
    --description-margin-inline: 0;
  }

  p {
    margin-block-end: var(--gutter);
  }
</style>
