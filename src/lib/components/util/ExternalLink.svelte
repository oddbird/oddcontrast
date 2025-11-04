<script lang="ts">
  import Icon from '$lib/components/util/Icon.svelte';

  interface Props {
    href: string | undefined;
    showNewTabIcon?: boolean;
    children?: import('svelte').Snippet;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  let { href, showNewTabIcon = true, children, ...rest }: Props = $props();
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a {href} target="_blank" rel="noopener noreferrer" {...rest}
  >{@render children?.()}{#if showNewTabIcon}<span class="sr-only"
      >(opens in a new tab)</span
    ><Icon name="newtab" size="small" />{/if}</a
>
