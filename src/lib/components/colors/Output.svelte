<script lang="ts">
  import { inGamut, serialize, to } from 'colorjs.io/fn';
  import type { PlainColorObject } from 'colorjs.io/types/src/color';

  import SupportWarning from '$lib/components/colors/SupportWarning.svelte';
  import type { ColorFormatId } from '$lib/constants';

  export let type: 'bg' | 'fg';
  export let color: PlainColorObject;
  export let space: ColorFormatId;

  $: targetSpace = space === 'hex' ? 'srgb' : space;
  $: targetColor = to(color, targetSpace);
  $: isInGamut = inGamut(targetColor);
  $: targetColorValue = serialize(targetColor, {
    format: space,
    inGamut: false,
  });
</script>

<ul data-group="output {type}">
  <li>
    <span data-color-info="value">{targetColorValue}</span>
    <SupportWarning {space} />
    {#if !isInGamut}
      <span data-color-info="warning">This color is out of gamut.</span>
    {/if}
  </li>
</ul>
