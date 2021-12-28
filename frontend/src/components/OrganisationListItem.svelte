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

<div  class="c-sb-org">
   <div on:click={toggleOrgCollapse} class="c-sb-org__header">
      <li class="c-sb-org__title">{organization.name}</li>
      <div class="c-sb-org__chevron">
         <ChevronUp />
      </div>
   </div>

   <ul class=" c-sb-regs">
      {#if organization.registers && organization.registers.length > 0}
         {#each organization.registers as register}
         <li class="c-sb-reg">{register.name}</li>
         {/each}
      {/if}
   </ul>
</div>
