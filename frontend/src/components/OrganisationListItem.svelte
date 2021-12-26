<script lang="ts">
   import ChevronUp from 'svelte-material-icons/ChevronUp.svelte'

   export let organization;

   let orgCollapse = true

   function toggleOrgCollapse() {
      orgCollapse = !orgCollapse

      console.log('collapsed one org')
      console.log(orgCollapse)
   }
</script>

<div  class="c-sidebar__org">
   <div on:click={toggleOrgCollapse} class="c-sidebar__org--title">
      <li class="c-sidebar__org--title-text">{organization.name}</li>
      <div class="c-sidebar__org--title-chevron {orgCollapse ? 'u-flip' : ''}">
         <ChevronUp />
      </div>
   </div>

   <ul class=" c-sidebar__org--list {orgCollapse ? 'u-hidden' : ''}">
      {#if organization.registers && organization.registers.length > 0}
         {#each organization.registers as register}
         <li class="c-sidebar__org--item">{register.name}</li>
         {/each}
      {/if}
   </ul>
</div>
