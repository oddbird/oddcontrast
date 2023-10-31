<script lang="ts">
  import { inGamut } from 'colorjs.io/fn';
  import type { PlainColorObject } from 'colorjs.io/types/src/color';

  import Output from '$lib/components/colors/Output.svelte';
  import type { FormatGroup } from '$lib/constants';
  import { ColorSpace } from '$lib/stores';
  import { getSpaceFromFormatId } from '$lib/utils';

  import ExternalLink from '../util/ExternalLink.svelte';

  export let type: 'bg' | 'fg';
  export let color: PlainColorObject;
  export let formatGroup: FormatGroup;

  function inGamutForSpace(color: PlainColorObject) {
    if (!formatGroup.gamutFormat) return true;
    const gamutSpace = ColorSpace.get(
      getSpaceFromFormatId(formatGroup.gamutFormat),
    );
    return inGamut(color, gamutSpace);
  }
  $: isInGamut = inGamutForSpace(color);
</script>

<div data-content="format-group">
  <h5>{formatGroup.name}</h5>
  {#if !isInGamut}
    <span data-color-info="warning"
      >Selected color is <ExternalLink
        href="https://www.w3.org/TR/css-color-4/#out-of-gamut"
        >outside the {formatGroup.gamutName} gamut.</ExternalLink
      ></span
    >
  {/if}
  {#each formatGroup.formats as format (format)}
    <Output {type} {color} {format} />
  {/each}
</div>

<style lang="scss">
  [data-color-info='warning'] {
    grid-area: message;
  }
</style>
