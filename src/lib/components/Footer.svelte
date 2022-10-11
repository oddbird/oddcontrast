<script lang="ts">
  let start = 2022;
  let year = new Date().getFullYear();
</script>

<footer data-layout="footer">
  <p>
    &copy; {start}{year > start ? `–${year}` : ''} OddBird.
  </p>
</footer>
