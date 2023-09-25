<script lang="ts">
  import { inGamut, serialize, to } from 'colorjs.io/fn';
  import type { PlainColorObject } from 'colorjs.io/types/src/color';

  import SupportWarning from '$lib/components/colors/SupportWarning.svelte';
  import CopyButton from '$lib/components/util/CopyButton.svelte';
  import type { ColorFormatId } from '$lib/constants';
  import { getSpaceFromFormatId } from '$lib/utils';

  export let type: 'bg' | 'fg';
  export let color: PlainColorObject;
  export let format: ColorFormatId;

  $: targetSpace = getSpaceFromFormatId(format);
  $: targetColor = to(color, targetSpace);
  $: isInGamut = inGamut(targetColor);
  $: targetColorValue = serialize(targetColor, {
    format,
    inGamut: false,
  });
</script>

<ul data-group="output {type}">
  <li>
    <CopyButton text={targetColorValue} />
    <span data-color-info="value">{targetColorValue}</span>
    <SupportWarning {format} />
    {#if !isInGamut}
      <span data-color-info="warning"
        >This color is outside the {targetColor.space.name} gamut.</span
      >
    {/if}
  </li>
</ul>

<style lang="scss">
  li {
    display: grid;
    grid-template:
      'copy color' auto
      'copy message' 3ex / var(--icon-medium) 1fr;
  }

  [data-color-info='value'] {
    grid-area: color;
  }

  [data-color-info='warning'] {
    grid-area: message;
  }
</style>
