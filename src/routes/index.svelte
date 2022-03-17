<script>
  import Banner from '$lib/banner.svelte';
  import Header from '$lib/header.svelte';
  import Footer from '$lib/footer.svelte';
</script>

<Banner />

<main data-layout="main">
  <Header />
  Color Forms go here
</main>

<Footer />

<style lang="scss" global>
  @use '../sass/app.scss';
</style>
