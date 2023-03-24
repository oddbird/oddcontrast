<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  import Check from '$lib/icons/Check.svelte';
  import GitHub from '$lib/icons/GitHub.svelte';
  import Logo from '$lib/icons/Logo.svelte';
  import Mastodon from '$lib/icons/Mastodon.svelte';
  import NewTab from '$lib/icons/NewTab.svelte';
  import OddBird from '$lib/icons/OddBird.svelte';
  import Twitter from '$lib/icons/Twitter.svelte';
  import Warning from '$lib/icons/Warning.svelte';

  const icons: { [key: string]: typeof SvelteComponent } = {
    check: Check,
    logo: Logo,
    newtab: NewTab,
    warning: Warning,
    github: GitHub,
    twitter: Twitter,
    oddbird: OddBird,
    mastodon: Mastodon,
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
