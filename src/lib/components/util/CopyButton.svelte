<script lang="ts">
  import Icon from '$lib/components/util/Icon.svelte';

  export let text: string;
  export let size: string | null = null;

  let justCopied = false;
  let timeout: ReturnType<typeof setTimeout>;

  const copyOutput = () => {
    justCopied = true;
    void navigator.clipboard.writeText(text);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      justCopied = false;
    }, 1000);
  };
</script>

<button on:click={copyOutput} type="button" data-btn="icon">
  {#if !justCopied}
    <Icon name="clipboard" {size} />
    <span class="sr-only">Click to copy</span>
  {:else}
    <Icon name="copy" {size} />
    <span class="sr-only">Copied</span>
  {/if}
</button>
