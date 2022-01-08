<script lang="ts">
   import { onMount } from 'svelte'
   import { Link } from 'svelte-navigator'
   import { gqlHelper } from '../../../utils/graphQL'
   import NavigationBar from '../../NavigationBar.svelte'
   import SectionLoading from '../../Loading/SectionLoading.svelte'
   import { authHelper } from '../../../utils/auth'
   import { useNavigate } from 'svelte-navigator'
   const navigate = useNavigate()
   import Delete from 'svelte-material-icons/Delete.svelte'

   export let id
   export let orgId
   export let isOwner

   let deletePopup = false

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

   const openPopup = () => {
      deletePopup = true
   }
   const closePopup = () => {
      deletePopup = false
   }

   const removeRegister = async () => {
      gqlHelper.mutations
         .removeRegister(id)
         .catch(e => {
            console.log('mislukt')
         })
         .finally(() => {
            console.log('register verwijderd')
         })
      authHelper.refresh()
      navigate(`/${orgId}`)
   }

   onMount(async () => {
      getRegisterInfo()
   })
</script>

<div class="c-page">
   {#if fetchingState === 'loading'}
      <SectionLoading />
   {:else if fetchingState === 'error'}
      Error getting organization
   {:else if register}
      <div class="c-navigation__with-buttons">
         <NavigationBar title={register.name} />
         {#if isOwner}
            <button
               class="c-button u-button__delete u-button__delete-icon"
               on:click|preventDefault={openPopup}
            >
               <Delete /></button
            >
         {/if}
      </div>

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
                  <button class="c-button"> Bewerken </button>
               </Link>
            {/if}
         </div>
      </form>

      {#if deletePopup}
         <div class="c-popup-delete">
            <div class="c-popup-delete__info">
               <div class="c-popup-delete__title">Kassa verwijderen?</div>
               <div>Deze actie is onomkeerbaar.</div>
            </div>

            <div class="c-popup-delete__buttons">
               <button class="c-button u-button__cancel" on:click={closePopup}>Annuleren</button>
               <button
                  class="c-button u-button__delete u-button__delete-icon"
                  on:click={removeRegister}
               >
                  <Delete /></button
               >
            </div>
         </div>
      {/if}
   {/if}
</div>
