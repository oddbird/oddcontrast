<script>
  import Banner from './banner.svelte';
  import Header from './header.svelte';
  import Footer from './footer.svelte';
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
