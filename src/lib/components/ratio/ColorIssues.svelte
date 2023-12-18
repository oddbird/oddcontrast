<script lang="ts">
  import { onMount } from 'svelte';

  import ExternalLink from '$lib/components/util/ExternalLink.svelte';

  export let pass: boolean;

  let startOpen = false;
  onMount(() => {
    startOpen = window.matchMedia('(min-width: 80em)').matches;
  });
</script>

<details class="known-issues" open={startOpen} data-pass={pass}>
  <summary><strong>Known Color Issues</strong></summary>
  <dl class="issues-list">
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
  .known-issues {
    grid-area: knownissues;
    padding: var(--shim) var(--double-gutter);
  }
  .issues-list {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    gap: var(--gutter);
  }
  dd {
    --description-margin-inline: 0;
  }

  p {
    margin-block-end: var(--gutter);
  }
</style>
