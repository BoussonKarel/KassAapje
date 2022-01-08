<script lang="ts">
   import ArrowLeftThick from 'svelte-material-icons/ArrowLeftThick.svelte'
   import { navigate } from 'svelte-navigator'

   export let title: string
</script>

<div class="c-navigation">
   <div class="c-navigation__main">
      <button class="c-navigation__back" on:click={() => navigate(-1)}>
         <ArrowLeftThick />
      </button>
      <!-- <Link to=".." class="c-navigation__back">
         <ArrowLeftThick />
      </Link> -->
      <h1 class="c-navigation__title">
         {title}
      </h1>
   </div>
   
   <div class="c-navigation__extra">
      <slot />
   </div>
</div>
