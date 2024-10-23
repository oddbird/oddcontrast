<script lang="ts">
  import type { Component } from 'svelte';

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

  const icons: Record<string, Component> = {
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

  interface Props {
    name: string;
    size?: string | null;
  }

  let { name, size = null }: Props = $props();

  const IconComponent = $derived(icons[name] ?? null);
</script>

<IconComponent
  data-icon={name}
  data-icon-size={size}
  aria-hidden="true"
  focusable="false"
/>
