<script lang="ts">
  import { display } from 'colorjs.io/fn';

  import ExternalLink from '$lib/components/util/ExternalLink.svelte';
  import type { ColorFormatId } from '$lib/constants';
  import { ColorSpace } from '$lib/stores';
  import { getSpaceFromFormatId } from '$lib/utils';

  interface Props {
    format: ColorFormatId;
  }

  let { format }: Props = $props();

  let targetSpace = $derived(getSpaceFromFormatId(format));
  let spaceObject = $derived(ColorSpace.get(targetSpace));
  let fallbackColor = $derived(
    display(
      {
        space: spaceObject,
        coords: spaceObject.white,
      },
      { inGamut: false },
    ).color,
  );
  let isSupported = $derived(fallbackColor.space.id === targetSpace);
</script>

{#if !isSupported}
  <span data-color-info="warning">
    {spaceObject.name} is
    <ExternalLink
      href="https://caniuse.com/css-lch-lab,mdn-css_types_color_hsl,mdn-css_types_color_hsla,mdn-css_types_color_oklab,mdn-css_types_color_oklch,css-color-function"
    >
      not supported by your current browser</ExternalLink
    >.
  </span>
{/if}

<style lang="scss">
  [data-color-info~='warning'] {
    grid-column: 1 / -1;
  }
</style>
