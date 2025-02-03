<script lang="ts">
  import GamutSelect from '$lib/components/GamutSelect.svelte';
  import SpaceSelect from '$lib/components/SpaceSelect.svelte';
  import Icon from '$lib/components/util/Icon.svelte';
</script>

<header data-layout="header">
  <h1 id="app-logo">
    <Icon name="logo" />
    <span class="sr-only">OddContrast</span>
  </h1>
  <div id="color-settings">
    <SpaceSelect />
    <GamutSelect />
  </div>
</header>

<style lang="scss">
  #app-logo {
    display: flex;
    grid-area: logo;
  }

  #color-settings {
    display: grid;
    gap: inherit;
    grid-area: settings;
    grid-template-columns: repeat(2, auto);
    justify-content: safe end;
  }
</style>
