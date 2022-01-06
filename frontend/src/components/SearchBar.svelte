<script lang="ts">
import { createEventDispatcher } from 'svelte';
  import Magnify from 'svelte-material-icons/Magnify.svelte'

  export let extraClass = ''

  const dispatch = createEventDispatcher();
</script>

<div class="c-searchbar {extraClass}">
  <input class="c-searchbar__input" on:input={(e) => dispatch('search', e)} type="text" placeholder="Zoeken..." />
  <div class="c-searchbar__icon">
    <Magnify/>
  </div>
</div>