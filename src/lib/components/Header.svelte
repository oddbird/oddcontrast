<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import SpaceSelect from '$lib/components/SpaceSelect.svelte';
</script>

<header data-layout="header">
  <h1 class="app-logo">
    <Icon name="logo" size="large" />
    <span class="sr-only">OddContrast</span>
  </h1>
  <SpaceSelect />
  <ul data-nav="social" data-list="inline">
    <li>
      <a href="https://github.com/oddbird"
        >Icon<span class="sr-only">GitHub</span></a
      >
    </li>
    <li>
      <a href="https://twitter.com/oddbird"
        >Icon<span class="sr-only">Twitter</span></a
      >
    </li>
    <li>
      <a href="https://oddbird.net">Icon<span class="sr-only">OddBird</span></a>
    </li>
  </ul>
</header>

<style lang="scss">
  .app-logo {
    display: flex;
  }
</style>
