<script lang="ts">
   import NavigationBar from '../../NavigationBar.svelte'
   import { onMount } from 'svelte'
   import { gqlHelper } from '../../../utils/graphQL'

   export let id

   async function handleSubmit(event) {
      console.log('submitted')
      console.log(event)
   }

   let fetchingState = "",
      organization = undefined

   const getOrganizationInfo = async () => {
      fetchingState = "loading";

      organizations = await gqlHelper.queries
         .organization(id)
         .catch(e => {
            fetchingState = "error";
         })
         .finally(() => {
            fetchingState = "";
         })
   }

   onMount(async () => {
      getOrganizationInfo()
   })
</script>

<div>
   <div class="c-page">
      {#if fetchingState === "loading"}
         Loading
      {:else if fetchingState === "error"}
         Error getting organization
      {:else if organization}
         <div class="c-navigation">
            <NavigationBar title={organization.name} />
         </div>
         <form class="c-form" name="AddOrganisation" on:submit|preventDefault={handleSubmit}>
            <div class="c-form-edit">
               <p class="c-form-edit-label">Naam:</p>
               <div class="c-form-edit-field">
                  <p class="c-form-edit-field-output">Scouts Beselare</p>
               </div>

               <p class="c-form-edit-label">Website:</p>
               <div class="c-form-edit-field">
                  <p class="c-form-edit-field-output">www.scoutsbeselare.be</p>
               </div>

               <p class="c-form-edit-label">Email:</p>
               <div class="c-form-edit-field">
                  <p class="c-form-edit-field-output">scoutsbeselare@gmail.com</p>
               </div>

               <p class="c-form-edit-label">Straat:</p>
               <div class="c-form-edit-field">
                  <p class="c-form-edit-field-output">Oude Kortrijkstraat 46</p>
               </div>

               <p class="c-form-edit-label">Stad:</p>
               <div class="c-form-edit-field">
                  <p class="c-form-edit-field-output">Beselare</p>
               </div>

               <p class="c-form-edit-label">Postcode:</p>
               <div class="c-form-edit-field">
                  <p class="c-form-edit-field-output">8980</p>
               </div>

               <p class="c-form-edit-label">Land:</p>
               <div class="c-form-edit-field">
                  <p class="c-form-edit-field-output">Belgïe</p>
               </div>
            </div>
            <div class="c-form-altinputs">
               <div>image processing tool placeholder</div>

               <div>
                  <label class="c-form-label" for="Color"> Kleur:</label>

                  <div>Current color bar placeholder</div>
               </div>

               <button class="c-button-edit"> Bewerken </button>
            </div>
         </form>
      {/if}
   </div>
</div>
