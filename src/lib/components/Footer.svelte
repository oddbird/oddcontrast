<script lang="ts">
  import ExternalLink from '$lib/components/util/ExternalLink.svelte';
  import Icon from '$lib/components/util/Icon.svelte';
  import { SOCIAL_LINKS } from '$lib/constants';

  let start = 2022;
  let year = new Date().getFullYear();
</script>

<footer data-layout="footer">
  <span>
    &copy; {start}{year > start ? `–${year}` : ''} OddBird. Built with <ExternalLink
      href="https://colorjs.io/">Color.js</ExternalLink
    >.
  </span>
  <ul data-nav="social" data-list="inline">
    {#each SOCIAL_LINKS as { name, icon, href }}
      <li>
        <ExternalLink {href} showNewTabIcon={false} title={name}>
          <Icon name={icon} />
          <span class="sr-only">{name}</span></ExternalLink
        >
      </li>
    {/each}
  </ul>
</footer>
