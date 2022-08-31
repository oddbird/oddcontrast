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
  <div>
    {#if pass}
      <Check />
      Pass
    {:else}
      <Warning />
      Fail
    {/if}
  </div>
  {level}
  {type}
</div>
