<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  import Check from '$lib/icons/Check.svelte';
  import Clipboard from '$lib/icons/Clipboard.svelte';
  import Copy from '$lib/icons/Copy.svelte';
  import GitHub from '$lib/icons/GitHub.svelte';
  import LinkedIn from '$lib/icons/LinkedIn.svelte';
  import Logo from '$lib/icons/Logo.svelte';
  import Mastodon from '$lib/icons/Mastodon.svelte';
  import NewTab from '$lib/icons/NewTab.svelte';
  import OddBird from '$lib/icons/OddBird.svelte';
  import Twitter from '$lib/icons/Twitter.svelte';
  import Warning from '$lib/icons/Warning.svelte';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const icons: Record<string, typeof SvelteComponent<any>> = {
    check: Check,
    clipboard: Clipboard,
    copy: Copy,
    logo: Logo,
    newtab: NewTab,
    warning: Warning,
    github: GitHub,
    twitter: Twitter,
    oddbird: OddBird,
    linkedin: LinkedIn,
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
