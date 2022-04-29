<script lang="ts">
  import { SPACES } from '$lib/constants';
  import { bg, fg, space } from '$lib/stores';
  import Color from '$src/vendor/color.esm';

  // Update color formats when space selection changes
  $: {
    if ($bg.spaceId !== $space) {
      $bg.spaceId = $space;
    }
    if ($fg.spaceId !== $space) {
      $fg.spaceId = $space;
    }
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

<style lang="scss">
@use 'config';

[data-field='color-space'] {
  align-items: center;
  display: grid;
  column-gap: var(--gutter);
  grid-template: 'format-label' auto
    'format-input' auto / 1fr;
  justify-content: end;

  @include config.above('sm-page-break') {
    grid-template: 'format-label format-input' auto / 1fr minmax(10rem, auto);
  }
}

label {
  grid-area: format-label;

  @include config.above('sm-page-break') {
    text-align: right;
  }
}

select {
  grid-area: format-input;
}

</style>