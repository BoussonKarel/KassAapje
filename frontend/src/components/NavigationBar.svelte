<script lang="ts">
   import ArrowLeftThick from 'svelte-material-icons/ArrowLeftThick.svelte'
   import Settings from 'svelte-material-icons/Settings.svelte'
   import { navigate } from 'svelte-navigator'

   export let title
   export let settings
</script>

<div class="c-navigation-bar">
   <div class="c-navigation-back">
      <button on:click={() => navigate(-1)} class="c-button-back">
         <ArrowLeftThick />
      </button>
   </div>

   <h1 class="c-navigation-title">
      {title}
   </h1>
   {#if settings}
      <div class="c-navigation-settings">
         <Settings />
      </div>
   {/if}
</div>
