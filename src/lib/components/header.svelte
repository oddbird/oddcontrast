<script lang="ts">
  import Logo from '$lib/components/logo.svelte';
</script>

<header data-layout="header">
  <h1 class="app-logo">
    <Logo />
    <span class="sr-only">OddContrast</span>
  </h1>
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
