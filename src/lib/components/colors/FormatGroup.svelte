<script lang="ts">
  import { inGamut, type PlainColorObject } from 'colorjs.io/fn';

  import Output from '$lib/components/colors/Output.svelte';
  import type { FormatGroup } from '$lib/constants';
  import { ColorSpace } from '$lib/stores';
  import { getSpaceFromFormatId } from '$lib/utils';

  import ExternalLink from '../util/ExternalLink.svelte';

  interface Props {
    type: 'bg' | 'fg';
    color: PlainColorObject;
    formatGroup: FormatGroup;
  }

  let { type, color, formatGroup }: Props = $props();

  function inGamutForSpace(color: PlainColorObject) {
    if (!formatGroup.gamutFormat) return true;
    const gamutSpace = ColorSpace.get(
      getSpaceFromFormatId(formatGroup.gamutFormat),
    );
    return inGamut(color, gamutSpace);
  }
  let isInGamut = $derived(inGamutForSpace(color));
</script>

<div data-content="format-group">
  <div class="format-group-heading">
    <h2 class="label section-heading">{formatGroup.name}</h2>
    {#if !isInGamut}
      <span data-color-info="warning"
        >Selected color is <ExternalLink
          href="https://www.w3.org/TR/css-color-4/#out-of-gamut"
          >outside the {formatGroup.gamutName} gamut.</ExternalLink
        ></span
      >
    {/if}
  </div>
  {#each formatGroup.formats as format (format)}
    <Output {type} {color} {format} />
  {/each}
</div>

<style lang="scss">
  [data-content~='format-group'] {
    --heading-transform: none;

    margin-block-end: var(--double-gutter);
  }

  .format-group-heading {
    align-items: baseline;
    display: flex;
    flex-wrap: wrap;
    gap: var(--shim);
    margin-block-end: var(--gutter);
  }
</style>
