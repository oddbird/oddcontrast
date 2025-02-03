<script lang="ts">
  import { GAMUTS } from '$lib/constants';
  import { gamut } from '$lib/stores';
</script>

<div data-setting="color-gamut">
  <label for="color-gamut" data-label>Gamut</label>
  <select name="color-gamut" id="color-gamut" bind:value={$gamut}>
    {#each GAMUTS as gamut (gamut.format)}
      {#if gamut}
        <option value={gamut.format}>{gamut.name}</option>
      {/if}
    {/each}
  </select>
</div>
