<script lang='ts'>
  import ActivityIndicator from "./ActivityIndicator.svelte";

  export let size = 1;
</script>

<div class="c-loading">
  <ActivityIndicator size={size} />
</div>