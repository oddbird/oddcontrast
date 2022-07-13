<script lang="ts" context="module">
  // Register necessary color spaces
  import '$lib/utils/initColors';
</script>

<svelte:head>
  <title>OddContrast</title>
</svelte:head>

<slot />

<style lang="scss" global>
  @use 'app';
</style>
