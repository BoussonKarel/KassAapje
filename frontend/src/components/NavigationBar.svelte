<script lang="ts">
   import ArrowLeftThick from 'svelte-material-icons/ArrowLeftThick.svelte'
   import Settings from 'svelte-material-icons/Settings.svelte'
   import { navigate } from 'svelte-navigator'

   export let title: string
   export let settings: boolean = false
</script>

<div class="c-navigation">
   <button class="c-navigation__back" on:click={() => navigate(-1)}>
      <ArrowLeftThick />
   </button>
   <h1 class="c-navigation__title">
      {title}
   </h1>
   {#if settings}
      <div class="c-navigation__settings">
         <Settings />
      </div>
   {/if}
</div>
