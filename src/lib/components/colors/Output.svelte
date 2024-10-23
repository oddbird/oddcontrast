<script lang="ts">
  import { type PlainColorObject, serialize, to } from 'colorjs.io/fn';

  import SupportWarning from '$lib/components/colors/SupportWarning.svelte';
  import CopyButton from '$lib/components/util/CopyButton.svelte';
  import type { ColorFormatId } from '$lib/constants';
  import { getSpaceFromFormatId } from '$lib/utils';

  interface Props {
    type: 'bg' | 'fg';
    color: PlainColorObject;
    format: ColorFormatId;
  }

  let { type, color, format }: Props = $props();

  let targetSpace = $derived(getSpaceFromFormatId(format));
  let targetColor = $derived(to(color, targetSpace));
  let targetColorValue = $derived(
    serialize(targetColor, {
      format,
      inGamut: false,
    }),
  );
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
