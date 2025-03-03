<script lang="ts">
  import type { PlainColorObject } from 'colorjs.io/fn';

  import FormatGroup from '$lib/components/colors/FormatGroup.svelte';
  import {
    type ColorFormatId,
    FORMAT_GROUPS,
    type FormatGroup as FormatGroupType,
  } from '$lib/constants';

  interface Props {
    type: 'bg' | 'fg';
    color: PlainColorObject;
    format: ColorFormatId;
  }

  let { type, color, format }: Props = $props();

  function otherFormatGroups(
    selectedFormat: ColorFormatId,
  ): typeof FORMAT_GROUPS {
    const otherFormats: FormatGroupType[] = [];
    FORMAT_GROUPS.forEach((group) => {
      const groupFormats = group.formats.filter((s) => s !== selectedFormat);
      if (groupFormats.length) {
        otherFormats.push({ ...group, formats: groupFormats });
      }
    });
    return otherFormats;
  }

  let displayType = $derived(type === 'bg' ? 'Background' : 'Foreground');
  let otherFormats = $derived(otherFormatGroups(format));
</script>

<div data-content="formats" data-column="tool">
  <h2 class="small-only label">{displayType} Color</h2>
  {#each otherFormats as formatGroup (formatGroup.name)}
    <FormatGroup {type} {color} {formatGroup} />
  {/each}
</div>

<style lang="scss">
  [data-content~='formats'] {
    margin-block-end: var(--double-gutter);
  }

  .small-only {
    --label-margin-block-end: var(--gutter);
  }
</style>
