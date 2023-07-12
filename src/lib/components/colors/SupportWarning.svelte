<script lang="ts">
  import { display } from 'colorjs.io/fn';

  import ExternalLink from '$lib/components/util/ExternalLink.svelte';
  import type { ColorFormatId } from '$lib/constants';
  import { ColorSpace } from '$lib/stores';

  export let space: ColorFormatId;

  $: targetSpace = space === 'hex' ? 'srgb' : space;
  $: spaceObject = ColorSpace.get(targetSpace);
  $: fallbackColor = display(
    {
      space: spaceObject,
      coords: spaceObject.white,
    },
    { inGamut: false },
  ).color;
  $: isSupported = fallbackColor.space.id === targetSpace;
</script>

{#if !isSupported}
  <span data-color-info="warning">
    {spaceObject.name} is
    <ExternalLink
      href="https://caniuse.com/mdn-css_types_color_oklab,mdn-css_types_color_oklch,mdn-css_types_color_hsla,mdn-css_types_color_hsl"
    >
      not supported by your current browser.</ExternalLink
    >
  </span>
{/if}
