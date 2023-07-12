<script lang="ts">
  import type { PlainColorObject } from 'colorjs.io/types/src/color';

  import Output from '$lib/components/colors/Output.svelte';
  import type { ColorFormatId } from '$lib/constants';
  import { FORMATS } from '$lib/constants';

  export let type: 'bg' | 'fg';
  export let color: PlainColorObject;
  export let format: ColorFormatId;

  $: displayType = type === 'bg' ? 'Background' : 'Foreground';
  $: otherFormats = FORMATS.filter((s) => s !== format);
</script>

<div data-content="formats">
  <h4 class="small-only label">{displayType} Color</h4>
  {#each otherFormats as format (format)}
    <Output {type} {color} {format} />
  {/each}
</div>

<style lang="scss">
  [data-content~='formats'] {
    margin-bottom: var(--double-gutter);
  }
</style>
