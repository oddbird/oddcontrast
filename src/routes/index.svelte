<script lang="ts">
  import Banner from '$lib/components/banner.svelte';
  import Footer from '$lib/components/footer.svelte';
  import Form from '$lib/components/form/index.svelte';
  import Header from '$lib/components/header.svelte';
  import { bg, fg } from '$lib/stores';
</script>

<main data-layout="main" style="--fgcolor: {$fg}; --bgcolor: {$bg};">
  <Banner />
  <Header />
  <Form />
</main>

<Footer />
