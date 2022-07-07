<script lang="ts">
  import Formats from '$lib/components/colors/Formats.svelte';
  import Header from '$lib/components/colors/Header.svelte';
  import Sliders from '$lib/components/colors/Sliders.svelte';
  import SupportWarning from '$lib/components/colors/SupportWarning.svelte';
  import { bg, fg, space } from '$lib/stores';
</script>

<h2 class="sr-only">Check the contrast ratio between two colors</h2>

<SupportWarning space={$space} />

<form data-form="contrast-checker" data-layout="color-form">
  <Header type="bg" color={bg} {space} />
  <Sliders type="bg" color={bg} />

  <Header type="fg" color={fg} {space} />
  <Sliders type="fg" color={fg} />
</form>

<h3 class="label section-heading">Additional Formats</h3>
<div data-layout="split">
  <Formats type="bg" color={$bg} space={$space} />
  <Formats type="fg" color={$fg} space={$space} />
</div>

<style lang="scss">
  @use 'config';

  [data-form~='contrast-checker'] {
    margin-block: var(--double-gutter) var(--gutter);
  }

  [data-layout] {
    column-gap: var(--triple-gutter);
  }
</style>
