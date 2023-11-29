<script lang="ts">
  import ExternalLink from '$lib/components/util/ExternalLink.svelte';
  import Icon from '$lib/components/util/Icon.svelte';
  import type { ColorFormatId } from '$lib/constants';
  import { ColorSpace } from '$lib/stores';
  import { getSpaceFromFormatId } from '$lib/utils';

  export let format: ColorFormatId;

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
    ><Icon name="warning" /> Browser rendering for colors outside of the display
    gamut is incorrect
    <ExternalLink href="https://github.com/w3c/csswg-drafts/issues/9449">
      according to the CSS specification.</ExternalLink
    >
  </span>
{/if}
