<script lang="ts">
  import Icon from '$lib/components/util/Icon.svelte';

  export let href: string;
  export let showIcon = true;
</script>

<a {href} target="_blank" rel="noopener noreferrer"
  ><slot />{#if showIcon}<span class="sr-only">(opens in a new tab)</span><Icon
      name="newtab"
      size="small"
    />{/if}</a
>
