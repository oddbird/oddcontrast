<script lang="ts">
  import type { PlainColorObject } from 'colorjs.io/types/src/color';

  import FormatGroup from '$lib/components/colors/FormatGroup.svelte';
  import type { ColorFormatId } from '$lib/constants';
  import { FORMAT_GROUPS } from '$lib/constants';

  export let type: 'bg' | 'fg';
  export let color: PlainColorObject;
  export let format: ColorFormatId;

  function otherFormatGroups(
    selectedFormat: ColorFormatId,
  ): typeof FORMAT_GROUPS {
    const otherFormats: typeof FORMAT_GROUPS = {};
    Object.keys(FORMAT_GROUPS).forEach((key) => {
      const groupFormats = FORMAT_GROUPS[key]!.filter(
        (s) => s !== selectedFormat,
      );
      if (groupFormats.length) {
        otherFormats[key] = groupFormats;
      }
    });
    return otherFormats;
  }

  $: displayType = type === 'bg' ? 'Background' : 'Foreground';
  $: otherFormats = otherFormatGroups(format);
</script>

<div data-content="formats" data-column="tool">
  <h4 class="small-only label">{displayType} Color</h4>
  {#each Object.entries(otherFormats) as [name, formats]}
    <FormatGroup {type} {color} {name} {formats} />
  {/each}
</div>

<style lang="scss">
  [data-content~='formats'] {
    margin-bottom: var(--double-gutter);
  }

  .label {
    --label-margin-bottom: var(--gutter);
  }
</style>
