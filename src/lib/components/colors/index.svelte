<script lang="ts">
  import Formats from '$lib/components/colors/Formats.svelte';
  import Header from '$lib/components/colors/Header.svelte';
  import Output from '$lib/components/colors/Output.svelte';
  import Sliders from '$lib/components/colors/Sliders.svelte';
  import { bg, fg, space } from '$lib/stores';
</script>

<form data-form="contrast-checker" data-layout="split">
  <Header type="bg" color={bg} {space} />
  <Sliders type="bg" color={bg} />
  <Output type="bg" color={$bg} space={$bg.spaceId} />

  <Header type="fg" color={fg} {space} />
  <Sliders type="fg" color={fg} />
  <Output type="fg" color={$fg} space={$fg.spaceId} />
</form>

<div data-layout="split">
  <Formats type="bg" color={$bg} space={$space} />
  <Formats type="fg" color={$fg} space={$space} />
</div>

<style lang="scss">
  [data-form~='contrast-checker'] {
    grid-auto-flow: dense;
  }

  [data-layout~='split'] {
    gap: var(--gutter) var(--double-gutter);
  }
</style>
