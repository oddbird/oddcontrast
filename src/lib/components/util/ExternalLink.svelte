<script lang="ts">
  import Icon from '$lib/components/util/Icon.svelte';

  export let href: string | undefined;
  export let showNewTabIcon = true;
</script>

<a {href} target="_blank" rel="noopener noreferrer" {...$$restProps}
  ><slot />{#if showNewTabIcon}<span class="sr-only">(opens in a new tab)</span
    ><Icon name="newtab" size="small" />{/if}</a
>
