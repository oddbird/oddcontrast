<script lang="ts">
  import Banner from '$lib/components/banner.svelte';
  import Footer from '$lib/components/footer.svelte';
  import Form from '$lib/components/form/index.svelte';
  import Header from '$lib/components/header.svelte';
  import { bg, fg } from '$lib/stores';
</script>

<div data-layout="app" style="--fgcolor: {$fg}; --bgcolor: {$bg};">
  <Banner />
  <Header />
  <main data-layout="main">
    <Form />
  </main>
  <Footer />
</div>
