<script lang="ts">
  import { RATIOS } from '$lib/constants';
  import Check from '$lib/icons/Check.svelte';
  import Warning from '$lib/icons/Warning.svelte';

  export let level: 'AA' | 'AAA';
  export let type: 'Normal' | 'Large';
  export let ratio: number;

  $: pass = ratio >= RATIOS[level][type];
</script>

<div data-pass={pass}>
  <div data-pass-text>
    {#if pass}
      <Check />
      Pass
    {:else}
      <Warning />
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
    --icon-size: var(--status-icon);
    align-items: center;
    background-color: var(--fgcolor);
    border-radius: var(--border-radius);
    color: var(--bgcolor);
    display: flex;
    font-size: var(--input-large);
    font-weight: bold;
    gap: var(--shim-plus);
    justify-content: center;
    margin-bottom: var(--shim);
    padding: var(--results-padding-block, var(--shim))
      var(--results-padding-inline, var(--gutter));
  }
</style>
