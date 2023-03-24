<script lang="ts">
  import SpaceSelect from '$lib/components/SpaceSelect.svelte';
  import Icon from '$lib/components/util/Icon.svelte';
</script>

<header data-layout="header">
  <h1 class="app-logo">
    <Icon name="logo" />
    <span class="sr-only">OddContrast</span>
  </h1>
  <SpaceSelect />
</header>

<style lang="scss">
  .app-logo {
    display: flex;
  }
</style>
