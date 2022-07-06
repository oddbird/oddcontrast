<script lang="ts">
  import type { ColorSpace } from 'colorjs.io';
  import type Color from 'colorjs.io';

  import SupportWarning from '$lib/components/colors/SupportWarning.svelte';

  export let type: 'bg' | 'fg';
  export let color: Color;
  export let space: ColorSpace;

  $: targetColor = color.to(space);
  $: inGamut = targetColor.inGamut();
</script>

<ul data-group="output {type}">
  <li>
    <span data-color-info="value"
      >{targetColor.toString({ inGamut: false })}</span
    >
    <SupportWarning {space} />
    {#if !inGamut}
      <span data-color-info="warning">This color is out of gamut.</span>
    {/if}
  </li>
</ul>
