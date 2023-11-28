<script lang="ts">
  import ExternalLink from '$lib/components/util/ExternalLink.svelte';
  import type { ColorFormatId } from '$lib/constants';
  export let format: ColorFormatId;
  import Icon from '$lib/components/util/Icon.svelte';
  import { ColorSpace } from '$lib/stores';
  import { getSpaceFromFormatId } from '$lib/utils';

  $: targetSpace = getSpaceFromFormatId(format);
  $: spaceObject = ColorSpace.get(targetSpace);
  // TODO: Can be replaced with spaceObject.isUnbounded in next version of
  // Color.js.
  $: isUnbounded = Object.values(spaceObject.coords).every(
    (coord) => !('range' in coord),
  );
</script>

{#if isUnbounded}
  <span data-color-info="warning"
    ><Icon name="warning" /> Browser rendering of
    {spaceObject.name} for colors outside of the display gamut is incorrect
    <ExternalLink href="https://github.com/w3c/csswg-drafts/issues/9449">
      according to the CSS specification.</ExternalLink
    >
  </span>
{/if}
