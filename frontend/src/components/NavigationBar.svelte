<script lang="ts">
   import ArrowLeftThick from 'svelte-material-icons/ArrowLeftThick.svelte'
   import Settings from 'svelte-material-icons/Settings.svelte'
   import { navigate } from 'svelte-navigator'

   export let title: string
</script>

<div class="c-navigation">
   <div class="c-navigation__main">
      <button class="c-navigation__back" on:click={() => navigate(-1)}>
         <ArrowLeftThick />
      </button>
      <h1 class="c-navigation__title">
         {title}
      </h1>
   </div>
   
   <div class="c-navigation__extra">
      <slot />
   </div>
</div>
