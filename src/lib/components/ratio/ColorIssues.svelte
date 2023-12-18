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
  <summary><strong>Known Color Issues</strong></summary>
  <dl>
    <dt><strong>Gamut Mapping Implementation</strong></dt>
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
  </dl>
</details>

<style lang="scss">
  // Overrides the pattern from _lists
  summary {
    cursor: pointer;
    margin-block-end: var(--gutter);
  }
  dl {
    display: block;
  }
  dd {
    margin-inline-start: 0;
  }
  summary {
    list-style-position: outside;
  }
  details {
    background-color: var(--status-result-bg, var(--bgcolor));
    border-radius: var(--border-radius);
    color: var(--status-result-fg, var(--fgcolor));
    padding: var(--double-gutter);
  }
</style>
