<script lang="ts">
   import ArrowLeftThick from 'svelte-material-icons/ArrowLeftThick.svelte'
   import Settings from 'svelte-material-icons/Settings.svelte'

   export let title

   function handleBackButton(event) {
      console.log('Back Button')
      console.log(event)
   }
</script>

<div class="c-navigation-bar">
   <div class="c-navigation-back">
      <button on:click={handleBackButton} class="c-button-back">
         <ArrowLeftThick />
      </button>
   </div>

  <h1 class="c-navigation-title">
    {title}
  </h1>
  <div class="c-navigation-settings">
    <Settings />
  </div>
</div>
