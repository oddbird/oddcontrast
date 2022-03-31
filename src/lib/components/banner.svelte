<script lang="ts">
  import Logo from '$lib/components/logo.svelte';
</script>

<div data-layout="banner">
  <div class="app-logo">
    <Logo />
  </div>
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
</div>

<style lang="scss" scoped>
  .app-logo {
    display: flex;
  }
</style>
