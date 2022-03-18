<!-- One way to apply global styles: https://github.com/sveltejs/kit/issues/1948#issuecomment-1011544861 -->
<svelte:head>
  <title>OddContrast</title>
  <style lang="scss">
    @use '../sass/app.scss';
  </style>
</svelte:head>

<slot />
