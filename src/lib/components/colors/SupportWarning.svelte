<script lang="ts">
  import type { ColorSpace, ColorString } from 'colorjs.io';
  import Color from 'colorjs.io';

  export let space: ColorSpace;

  const color = new Color('white');

  $: targetColor = color.to(space);
  $: fallbackColor = (targetColor.toString({ fallback: true }) as ColorString)
    .color;
  $: isSupported = fallbackColor.spaceId === space;
</script>

{#if !isSupported}
  <span data-color-info="warning">
    {space} is
    <a
      href="https://caniuse.com/mdn-css_types_color_oklab,mdn-css_types_color_oklch,mdn-css_types_color_hsla,mdn-css_types_color_hsl"
    >
      not supported by your current browser</a
    >.
  </span>
{/if}
