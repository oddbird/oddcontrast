<script lang="ts">
  import Header from '$lib/components/colors/Header.svelte';
  import Output from '$lib/components/colors/Output.svelte';
  import Sliders from '$lib/components/colors/Sliders.svelte';
  import Formats from '$lib/components/formats/index.svelte';
  import { bg, fg } from '$lib/stores';
</script>

<form data-form="contrast-checker" data-layout="split">
  <Header type="bg" color={bg} />
  <Sliders type="bg" color={bg} />
  <Output type="bg" color={$bg} space={$bg.spaceId} />

  <Header type="fg" color={fg} />
  <Sliders type="fg" color={fg} />
  <Output type="fg" color={$fg} space={$fg.spaceId} />
</form>

<div data-layout="split">
  <Formats type="bg" />
  <Formats type="fg" />
</div>

<style lang="scss">
  [data-form~='contrast-checker'] {
    grid-auto-flow: dense;
  }

  [data-layout~='split'] {
    gap: var(--gutter) var(--double-gutter);
  }
</style>
