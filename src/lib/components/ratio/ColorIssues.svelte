<script lang="ts">
  import { onMount } from 'svelte';

  import { RATIOS } from '$lib/constants';

  import ExternalLink from '../util/ExternalLink.svelte';

  export let ratio: number;

  $: pass = ratio >= RATIOS['AA']['Normal'];

  let startOpen = false;
  onMount(() => {
    startOpen = window.matchMedia('(min-width: 80em)').matches;
  });
</script>

<details open={startOpen} data-pass={pass}>
  <summary>Known Color Issues</summary>
  <dl>
    <dt>Gamut Mapping implementation</dt>
    <dd>
      Browsers implemented gamut mapping using clipping, which is fast but
      provides inferior results to the algorithm defined in the <ExternalLink
        href="https://drafts.csswg.org/css-color/#binsearch"
        >CSS Spec</ExternalLink
      >. Until browsers are updated, colors that are out of gamut for your
      screen may be displayed very differently than expected.
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
