<script lang="ts">
  import { GAMUTS } from '$lib/constants';
  import { gamut } from '$lib/stores';
</script>

<div data-field="color-gamut">
  <label for="color-gamut" data-label>Gamut</label>
  <select name="color-gamut" id="color-gamut" bind:value={$gamut}>
    {#each GAMUTS as gamut (gamut.format)}
      {#if gamut}
        <option value={gamut.format}>{gamut.name}</option>
      {/if}
    {/each}
  </select>
</div>

<style lang="scss">
  @use 'config';

  [data-field='color-gamut'] {
    align-items: center;
    column-gap: var(--gutter);
    display: grid;
    grid-template:
      'format-label' auto
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
