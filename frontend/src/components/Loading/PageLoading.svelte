<script lang="ts">
  import Loading from "./Loading.svelte";
  export let loading = false;
</script>

{#if loading}
  <Loading size={2} />
{/if}
<slot />