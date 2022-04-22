<script lang="ts">
  import { SPACES } from '$lib/constants';
  import { bg, fg, space } from '$lib/stores';
  import Color from '$src/vendor/color.esm';

  // Update color formats when space selection changes
  $: {
    $bg.spaceId = $fg.spaceId = $space;
  }
</script>

<div data-field="color-space">
  <label for="color-space" data-label>Color Format</label>
  <select name="color-space" id="color-space" bind:value={$space}>
    {#each SPACES as spaceId}
      <option value={Color.spaces[spaceId].id}
        >{Color.spaces[spaceId].name}</option
      >
    {/each}
  </select>
</div>
