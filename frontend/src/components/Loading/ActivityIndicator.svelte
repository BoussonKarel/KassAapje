<script lang='ts'>
  export let size = 1;
  // 0: small
  // 1: normal
  // 2: big

  $: className = size == 0 ? 'c-activity--small' : size == 2 ? 'c-activity--big' : '';
</script>

<div class={'c-activity ' + className}>
  <svg
      class="c-activity__svg"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
  >
      <circle class="c-activity__circle" cx="50" cy="50" r="45" />
  </svg>
</div>