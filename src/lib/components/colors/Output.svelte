<script lang="ts">
  import type { ColorSpace } from 'colorjs.io';
  import type Color from 'colorjs.io';

  import SupportWarning from '$lib/components/colors/SupportWarning.svelte';

  export let type: 'bg' | 'fg';
  export let color: Color;
  export let space: ColorSpace;

  $: targetColor = color.to(space);
  $: inGamut = targetColor.inGamut();
</script>

<div data-group="output {type}">
  <span data-color-info="value">{targetColor.toString({ inGamut: false })}</span
  >
  <SupportWarning {space} />
  {#if !inGamut}
    <span data-color-info="warning">This color is out of gamut.</span>
  {/if}
</div>

<style lang="scss">
  [data-color-info] {
    display: block;
  }

  [data-color-info~='value'] {
    font-size: var(--color-value-size, var(--medium));
    font-weight: var(--color-value-weight, normal);
  }

  [data-color-info~='warning'] {
    color: var(--warning);
    font-size: var(--xsmall);
  }
</style>
