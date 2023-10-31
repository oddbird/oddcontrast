<script lang="ts">
  import { serialize } from 'colorjs.io/fn';
  import type { PlainColorObject } from 'colorjs.io/types/src/color';

  import SupportWarning from '$lib/components/colors/SupportWarning.svelte';
  import CopyButton from '$lib/components/util/CopyButton.svelte';
  import type { ColorFormatId } from '$lib/constants';

  export let type: 'bg' | 'fg';
  export let color: PlainColorObject;
  export let format: ColorFormatId;

  $: colorValue = serialize(color, {
    format,
    inGamut: false,
  });
</script>

<ul data-group="output {type}">
  <li data-testid={`format-${format}`}>
    <CopyButton text={colorValue} />
    <span data-color-info="value">{colorValue}</span>
    <SupportWarning {format} />
  </li>
</ul>

<style lang="scss">
  li {
    column-gap: 1ch;
    display: grid;
    grid-template:
      'copy color' auto
      'copy message' 3ex / auto 1fr;
  }

  [data-color-info='value'] {
    grid-area: color;
  }
</style>
