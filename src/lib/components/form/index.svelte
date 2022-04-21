<script lang="ts">
  import Formats from '$lib/components/form/formats.svelte';
  import Input from '$lib/components/form/input.svelte';
  import Sliders from '$lib/components/form/sliders.svelte';
  import { bg, bg_display, fg, fg_display } from '$lib/stores';
</script>

<form data-form="contrast-checker" data-layout="split">
  <Input type="bg" value={$bg_display} />
  <Sliders type="bg" color={bg} />

  <Input type="fg" value={$fg_display} />
  <Sliders type="fg" color={fg} />
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
