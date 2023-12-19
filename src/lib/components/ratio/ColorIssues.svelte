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
  </dl>
</details>

<style lang="scss">
  .known-issues {
    grid-area: knownissues;
    margin-inline: calc(var(--gutter) * -1);
    padding: var(--gutter);
  }

  summary {
    align-items: center;
    display: grid;
    gap: var(--shim-plus);
    grid-template-columns: max-content var(--triangle-height);
    &::marker {
      content: none;
    }
    &::before {
      border-color: transparent transparent transparent currentColor;
      border-style: solid;
      border-width: var(--triangle-width) 0 var(--triangle-width)
        var(--triangle-height);
      content: '';
      grid-column: 2;
      grid-row: 1;
      margin-top: var(--half-shim);
      transform: rotate;
    }
  }

  [open] summary::before {
    transform: rotate(90deg);
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
