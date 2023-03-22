<script lang="ts">
  import ExternalLink from '$lib/components/util/ExternalLink.svelte';
  import Icon from '$lib/components/util/Icon.svelte';
  let start = 2022;
  let year = new Date().getFullYear();
  const links = [
    ['github', 'GitHub', 'https://github.com/oddbird/oddcontrast'],
    ['twitter', 'Twitter', 'https://twitter.com/oddbird'],
    ['oddbird', 'OddBird', 'https://www.oddbird.net/'],
  ];
</script>

<footer data-layout="footer">
  <span>
    &copy; {start}{year > start ? `–${year}` : ''} OddBird.
  </span>
  <ul data-nav="social" data-list="inline">
    {#each links as [name, text, href]}
      <li>
        <ExternalLink {href} showIcon={false}>
          <Icon {name} />
          <span class="sr-only">{text}</span></ExternalLink
        >
      </li>
    {/each}
  </ul>
</footer>

<style lang="scss">
  [data-nav='social'] {
    --li-padding-bottom: 0;
    --link: var(--text);
    --link-focus: var(--action);
  }
</style>
