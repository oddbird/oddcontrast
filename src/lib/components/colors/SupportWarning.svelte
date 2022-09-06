<script lang="ts">
  import type { ColorSpaceId } from 'colorjs.io/fn';
  import { display } from 'colorjs.io/fn';

  import { ColorSpace } from '$lib/stores';

  export let space: ColorSpaceId;

  $: spaceObject = ColorSpace.get(space);
  $: fallbackColor = display(
    {
      space: spaceObject,
      coords: spaceObject.white,
    },
    { inGamut: false },
  ).color;
  $: isSupported = fallbackColor.space.id === space;
</script>

{#if !isSupported}
  <span data-color-info="warning">
    {spaceObject.name} is
    <a
      href="https://caniuse.com/mdn-css_types_color_oklab,mdn-css_types_color_oklch,mdn-css_types_color_hsla,mdn-css_types_color_hsl"
    >
      not supported by your current browser</a
    >.
  </span>
{/if}
