<script lang="ts">
   import { onMount } from 'svelte'
   import { Link } from 'svelte-navigator'
   import { gqlHelper } from '../../../utils/graphQL'
   import NavigationBar from '../../NavigationBar.svelte'

   export let id
   export let orgId
   export let isOwner

   let fetchingState = '',
      register = undefined

   const getRegisterInfo = async () => {
      fetchingState = 'loading'

      register = await gqlHelper.queries
         .register(id)
         .catch(e => {
            fetchingState = 'error'
         })
         .finally(() => {
            fetchingState = ''
         })
      console.log(register)
   }

   onMount(async () => {
      getRegisterInfo()
   })
</script>

<div class="c-page">
   {#if fetchingState === 'loading'}
      Loading
   {:else if fetchingState === 'error'}
      Error getting organization
   {:else if register}
      <NavigationBar title={register.name} />

      <form class="c-form" name="RegisterInfo">
         <div class="c-form-edit">
            <p class="c-form-edit-label">Naam:</p>
            <div class="c-form-edit-field">
               <p class="c-form-edit-field-output">{register.name}</p>
            </div>

            <p class="c-form-edit-label">Beschrijving:</p>
            <div class="c-form-edit-field">
               <p class="c-form-edit-field-output u-description">
                  {register.description}
               </p>
            </div>
         </div>
         <div class="c-form-altinputs">
            <div>Roles Overview placeholder</div>

            {#if isOwner}
               <Link to="/{orgId}/{id}/edit">
                  <button class="c-button-edit"> Bewerken </button>
               </Link>
            {/if}
         </div>
      </form>
   {/if}
</div>
