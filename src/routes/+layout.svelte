<script lang="ts" context="module">
  // Import global styles
  import '$src/sass/app.scss';
  // Register necessary color spaces
  import '$lib/utils/initColors';
</script>

<svelte:head>
  <title>OddContrast</title>
</svelte:head>

<slot />
