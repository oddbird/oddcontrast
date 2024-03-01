<script lang="ts">
  import { type PlainColorObject, serialize, to } from 'colorjs.io/fn';

  import SupportWarning from '$lib/components/colors/SupportWarning.svelte';
  import CopyButton from '$lib/components/util/CopyButton.svelte';
  import type { ColorFormatId } from '$lib/constants';
  import { getSpaceFromFormatId } from '$lib/utils';

  export let type: 'bg' | 'fg';
  export let color: PlainColorObject;
  export let format: ColorFormatId;

  $: targetSpace = getSpaceFromFormatId(format);
  $: targetColor = to(color, targetSpace);
  $: targetColorValue = serialize(targetColor, {
    format,
    inGamut: false,
  });
</script>

<ul data-group="output {type}">
  <li data-testid={`format-${format}`}>
    <CopyButton text={targetColorValue} />
    <span data-color-info="value">{targetColorValue}</span>
    <SupportWarning {format} />
  </li>
</ul>

<style lang="scss">
  [data-group~='output'] {
    grid-column: 1 / -1;
  }

  li {
    align-items: center;
    column-gap: 0.5ch;
    display: grid;
    grid-template-columns: auto 1fr;
  }
</style>
