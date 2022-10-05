<script lang="ts">
  import SpaceSelect from '$lib/components/SpaceSelect.svelte';
  import ExternalLink from '$lib/components/util/ExternalLink.svelte';
  import Icon from '$lib/components/util/Icon.svelte';

  const links = [
    ['GitHub', 'https://github.com/oddbird/oddcontrast'],
    ['Twitter', 'https://twitter.com/oddbird'],
    ['GitHub', 'https://www.oddbird.net/'],
  ];
</script>

<header data-layout="header">
  <h1 class="app-logo">
    <Icon name="logo" />
    <span class="sr-only">OddContrast</span>
  </h1>
  <SpaceSelect />
  <ul data-nav="social" data-list="inline">
    {#each links as [name, href]}
      <li>
        <ExternalLink {href} showIcon={false}
          >Icon<span class="sr-only">{name}</span></ExternalLink
        >
      </li>
    {/each}
  </ul>
</header>

<style lang="scss">
  .app-logo {
    display: flex;
  }
</style>
