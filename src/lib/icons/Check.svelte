<script lang="ts">
  let props = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="39"
  height="27.81"
  viewBox="0 0 39 27.81"
  {...props}
>
  <path
    id="check"
    data-name="check"
    d="M38.19,.82c1.08,1.08,1.09,2.84,0,3.93,0,0,0,0,0,0L15.94,26.99c-1.08,1.08-2.84,1.09-3.93,0,0,0,0,0,0,0L.88,15.87c-1.12-1.05-1.18-2.81-.13-3.93,1.05-1.12,2.81-1.18,3.93-.13,.04,.04,.09,.08,.13,.13l9.08,9.15L34.26,.82c1.08-1.08,2.84-1.09,3.92,0,0,0,0,0,0,0Z"
  />
</svg>

<style lang="scss">
  [data-icon] {
    // a small change in width to make it visually equal to warning
    --icon-width: calc(var(--icon-size-default) - 0.2em);
  }
</style>
