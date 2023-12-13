<script lang="ts">
  import { onMount } from 'svelte';

  import ExternalLink from '$lib/components/util/ExternalLink.svelte';

  export let pass: boolean;

  let startOpen = false;
  onMount(() => {
    startOpen = window.matchMedia('(min-width: 80em)').matches;
  });
</script>

<details open={startOpen} data-pass={pass}>
  <summary>Known Color Issues</summary>
  <dl>
    <dt>Gamut Mapping Implementation</dt>
    <dd>
      Browsers implemented gamut mapping using clipping, which is fast but
      provides inferior results compared to the algorithm defined in the <ExternalLink
        href="https://drafts.csswg.org/css-color/#binsearch"
        >CSS Spec</ExternalLink
      >. Until browsers are updated, colors that are out of gamut for your
      screen may be displayed very differently than expected.
    </dd>
    <dt>Checking for Out of Gamut colors</dt>
    <dd>
      The new color features in CSS now allow for a much wider range of colors,
      many of which can not be shown on many (or any) screens. When selecting
      colors, consider that most users will see these colors on a display that
      supports the <code>sRGB</code> or <code>P3</code> gamut.There are 2
      primary ways you can get out of gamut-
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
      When a color is out of gamut for the user's screen, the browser will adjust
      the color to be in gamut.
    </dd>
  </dl>
</details>

<style lang="scss">
  // Overrides the pattern from _lists
  dl {
    display: block;
  }
  dt {
    font-weight: bold;
  }
  dd {
    margin-inline-start: 0;
  }
  summary {
    font-weight: bold;
    list-style-position: outside;
  }
  details {
    background-color: var(--status-result-bg, var(--bgcolor));
    border-radius: var(--border-radius);
    color: var(--status-result-fg, var(--fgcolor));
    padding: var(--double-gutter);
  }
</style>
