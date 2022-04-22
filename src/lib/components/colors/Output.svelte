<script lang="ts">
  import type { ColorSpace } from '$src/vendor/color.esm';
  import Color from '$src/vendor/color.esm';

  export let type: 'bg' | 'fg';
  export let color: Color;
  export let space: ColorSpace;

  $: isPrimary = color.spaceId === space;
  $: targetColor = isPrimary ? color : color.to(space, { inGamut: false });
  $: inGamut = targetColor.inGamut();
  $: fallbackColor = targetColor.toString({ fallback: true }).color as Color;
  $: isSupported = fallbackColor.spaceId === space;
</script>

<div data-group="output {type}" data-is-primary={isPrimary}>
  <div>{Color.spaces[space].name}</div>
  <div>{targetColor.toString({ inGamut: false })}</div>
  {#if !inGamut}
    <div class="warning">color out of gamut</div>
  {/if}
  {#if !isSupported}
    <div class="warning">color format is not supported by current browser</div>
  {/if}
</div>

<style lang="scss">
  [data-is-primary='true'] {
    font-weight: bold;
  }
</style>
