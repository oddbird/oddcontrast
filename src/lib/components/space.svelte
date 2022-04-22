<script lang="ts">
  import { SPACES } from '$lib/constants';
  import { bg, fg, INITIAL_VALUES } from '$lib/stores';
  import Color, { type ColorSpace } from '$src/vendor/color.esm';

  $: space = INITIAL_VALUES.space;

  const handleSpaceChange = (e: Event) => {
    const value = (e.target as HTMLSelectElement).value as ColorSpace;
    $bg.spaceId = $fg.spaceId = space = value;
  };
</script>

<div data-field="color-space">
  <label for="color-space" data-label>Color Format</label>
  <select
    name="color-space"
    id="color-space"
    value={space}
    on:change={handleSpaceChange}
  >
    {#each SPACES as spaceId}
      <option value={Color.spaces[spaceId].id}
        >{Color.spaces[spaceId].name}</option
      >
    {/each}
  </select>
</div>
