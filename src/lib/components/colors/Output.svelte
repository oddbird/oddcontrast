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
    <dd data-color-info="warning">
      color format is not supported by current browser
    </dd>
  {/if}
</dl>

<style lang="scss">
  [data-is-primary='true'] {
    --type-size: var(--medium-label);
    --value-size: var(--large-label);
  }

  [data-color-info~='type'] {
    font-size: var(--type-size, var(--small-label));
    font-weight: bold;
  }

  [data-color-info~='value'] {
    font-size: var(--value-size, var(--medium-label));
    margin-bottom: var(--shim);
  }

  [data-color-info~='warning'] {
    color: var(--warning);
    font-size: var(--xsmall);
  }
</style>
