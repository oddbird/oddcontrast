<script lang="ts">
  import { inGamut, serialize, to } from 'colorjs.io/fn';
  import type { ColorObject } from 'colorjs.io/types/src/color';

  import SupportWarning from '$lib/components/colors/SupportWarning.svelte';
  import type { ColorSpaceId } from '$lib/constants';

  export let type: 'bg' | 'fg';
  export let color: ColorObject;
  export let space: ColorSpaceId;

  $: targetColor = to(color, space);
  $: isInGamut = inGamut(targetColor);
  $: targetColorValue = serialize(targetColor, { inGamut: false });
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
