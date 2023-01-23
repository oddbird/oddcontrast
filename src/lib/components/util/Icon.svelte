<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  import Check from '$lib/icons/Check.svelte';
  import Logo from '$lib/icons/Logo.svelte';
  import NewTab from '$lib/icons/NewTab.svelte';
  import Warning from '$lib/icons/Warning.svelte';

  const icons: { [key: string]: typeof SvelteComponent } = {
    check: Check,
    logo: Logo,
    newtab: NewTab,
    warning: Warning,
  };

  export let name: string;
  export let size: string | null = null;
</script>

<svelte:component
  this={icons[name] ?? null}
  data-icon={name}
  data-icon-size={size}
  aria-hidden="true"
  focusable="false"
/>
