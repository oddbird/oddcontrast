<script lang="ts">
  import { inGamut, to } from 'colorjs.io/fn';
  import type { PlainColorObject } from 'colorjs.io/types/src/color';

  import Output from '$lib/components/colors/Output.svelte';
  import type { ColorFormatId } from '$lib/constants';
  import { getSpaceFromFormatId } from '$lib/utils';

  import ExternalLink from '../util/ExternalLink.svelte';

  export let type: 'bg' | 'fg';
  export let color: PlainColorObject;
  export let name: string;
  export let formats: ColorFormatId[];

  $: targetSpace = getSpaceFromFormatId(formats[0] as ColorFormatId);
  $: targetColor = to(color, targetSpace);
  $: isInGamut = inGamut(targetColor);
</script>

<div data-content="format-group">
  <h5>{name}</h5>
  {#if !isInGamut}
    <span data-color-info="warning"
      >Selected color is <ExternalLink
        href="https://www.w3.org/TR/css-color-4/#out-of-gamut"
        >outside the {targetColor.space.name} gamut.</ExternalLink
      ></span
    >
  {/if}
  {#each formats as format (format)}
    <Output {type} color={targetColor} {format} />
  {/each}
</div>

<style lang="scss">
  [data-color-info='warning'] {
    grid-area: message;
  }
</style>
