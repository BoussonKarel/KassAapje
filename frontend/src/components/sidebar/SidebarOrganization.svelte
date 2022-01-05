<script lang="ts">
   import { gqlHelper } from '../../utils/graphQL'
   import { onMount } from 'svelte'
   import ChevronUp from 'svelte-material-icons/ChevronUp.svelte'
   import Settings from 'svelte-material-icons/Settings.svelte'
   import { Link } from 'svelte-navigator'

   export let organization

   let registers;

   let collapsed = true
   function toggleCollapse() {
      collapsed = !collapsed
   }

   onMount(async () => {
      registers = organization.registers
   })
</script>

<div class="c-sidebar__org c-sb-org {collapsed ? 'c-sb-org--collapsed' : ''}">
   <button on:click={toggleCollapse} class="c-sb-org__header">
      <div class="c-sb-org__title">{organization.name}</div>
      <div class="c-sb-org__chevron">
         <ChevronUp />
      </div>
   </button>

   <!-- Registers -->
   <ul class="c-sb-org__content">
      {#if registers && registers.length > 0}
         {#each registers as register}
            <li class="c-sb-org__item">
               <Link to="/{organization.organization_id}/{register.register_id}"
                  >{register.name}</Link
               >
            </li>
         {/each}
      {/if}
      <li class="c-sb-org__item c-sb-org__item--noreg">
         <Link to="/{organization.organization_id}/info">
            <Settings />
            Instellingen
         </Link>
      </li>
   </ul>
</div>
