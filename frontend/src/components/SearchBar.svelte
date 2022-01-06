<script lang="ts">
  import Magnify from 'svelte-material-icons/Magnify.svelte'

  export let extraClass = ''
</script>

<div class="c-searchbar {extraClass}">
  <input class="c-searchbar__input" type="text" placeholder="Zoeken..." />
  <div class="c-searchbar__icon">
    <Magnify/>
  </div>
</div>