<script lang="ts">
  import type { ColorSpace, ColorString } from '$src/vendor/color.esm';
  import Color from '$src/vendor/color.esm';

  export let type: 'bg' | 'fg';
  export let color: Color;
  export let space: ColorSpace;

  $: isPrimary = color.spaceId === space;
  $: targetColor = isPrimary ? color : color.to(space);
  $: inGamut = targetColor.inGamut();
  $: fallbackColor = (targetColor.toString({ fallback: true }) as ColorString)
    .color;
  $: isSupported = fallbackColor.spaceId === space;
</script>

<dl data-group="output {type}" data-is-primary={isPrimary}>
  <dt data-color-info="type">{Color.spaces[space].name}</dt>
  <dd data-color-info="value">{targetColor.toString({ inGamut: false })}</dd>
  {#if !inGamut}
    <dd data-color-info="warning">color out of gamut</dd>
  {/if}
  {#if !isSupported}
    <dd data-color-info="warning">color format is not supported by current browser</dd>
  {/if}
</dl>

<style lang="scss">
  [data-is-primary='true'] {
    --color-type-size: var(--medium);
    --color-value-size: var(--large);
    --color-type-weight: bold;
  }

  [data-color-info~='type'] {
    font-size: var(--color-type-size, var(--xsmall));
    font-weight: var(--color-type-weight, normal);
  }

  [data-color-info~='value'] {
    font-size: var(--color-value-size, var(--medium));
    font-weight: var(--color-value-weight, normal);
    margin-bottom: var(--shim);
  }

  [data-color-info~='warning'] {
    color: var(--warning);
    font-size: var(--xsmall);
  }
</style>
