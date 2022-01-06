<script lang="ts">
  import Magnify from 'svelte-material-icons/Magnify.svelte'

  export let extraClass = ''
</script>

<div class="c-searchbar {extraClass}">
  <input class="c-searchbar-input" type="text" placeholder="zoeken...">
    <div class="c-searchbar-icon">
      <Magnify/>
    </div>
</div>