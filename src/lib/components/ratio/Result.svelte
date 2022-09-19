<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import { RATIOS } from '$lib/constants';

  export let level: 'AA' | 'AAA';
  export let type: 'Normal' | 'Large';
  export let ratio: number;

  $: pass = ratio >= RATIOS[level][type];
</script>

<div data-pass={pass}>
  <div data-pass-text>
    {#if pass}
      <Icon name="check" />
      Pass
    {:else}
      <Icon name="warning" />
      Fail
    {/if}
  </div>
  <div class="label">
    {level}
    {type}
  </div>
</div>

<style lang="scss">
  @use 'config';

  [data-pass-text] {
    align-items: center;
    background-color: var(--status-result-bg, var(--text));
    border-radius: var(--border-radius);
    color: var(--status-result-fg, var(--bg));
    display: flex;
    font-size: var(--input-large);
    font-weight: bold;
    gap: var(--shim-plus);
    justify-content: center;
    margin-bottom: var(--results-margin-bottom, var(--half-shim));
    padding: var(--results-padding-block, 0) var(--results-padding-inline, 0);

    @include config.above('sm-page-break') {
      --results-margin-bottom: var(--shim);
      --results-padding-block: var(--shim);
      --results-padding-inline: var(--gutter);
    }
  }

  .label {
    background-color: var(--status-result-label-bg, var(--text));
    color: var(--status-result-label-fg, var(--bg));
    border-radius: var(--border-radius);
    display: inline-block;
    padding: var(--quarter-shim) var(--shim);
  }

  [data-pass='true'] {
    --status-result-fg: var(--bgcolor);
    --status-result-bg: var(--fgcolor);
    --status-result-label-bg: var(--bgcolor);
    --status-result-label-fg: var(--fgcolor);
  }
</style>
