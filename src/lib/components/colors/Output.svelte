<script lang="ts">
  import { inGamut, serialize, to } from 'colorjs.io/fn';
  import type { PlainColorObject } from 'colorjs.io/types/src/color';

  import SupportWarning from '$lib/components/colors/SupportWarning.svelte';
  import Icon from '$lib/components/util/Icon.svelte';
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
  function copyOutput() {
    void navigator.clipboard.writeText(targetColorValue);
  }
</script>

<ul data-group="output {type}">
  <li>
    <button on:click={copyOutput} type="button" data-btn>
      <Icon name="copy" />
      <span class="sr-only">Click to copy</span>
    </button>
    <span data-color-info="value">{targetColorValue}</span>
    <SupportWarning {format} />
    {#if !isInGamut}
      <span data-color-info="warning"
        >This color is outside the {targetColor.space.name} gamut.</span
      >
    {/if}
  </li>
</ul>
