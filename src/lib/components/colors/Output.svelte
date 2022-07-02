<script lang="ts">
  import type { ColorSpace, ColorString } from 'colorjs.io';
  import Color from 'colorjs.io';

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

<div data-group="output {type}" data-is-primary={isPrimary}>
  {#if !isPrimary}
    <span data-color-info="value"
      >{targetColor.toString({ inGamut: false })}</span
    >
    {#if !isSupported}
      <span data-color-info="warning">
        This color format is
        <a
          href="https://caniuse.com/mdn-css_types_color_oklab,mdn-css_types_color_oklch,mdn-css_types_color_hsla,mdn-css_types_color_hsl"
        >
          not supported by your current browser</a
        >.
      </span>
    {/if}
  {/if}
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
