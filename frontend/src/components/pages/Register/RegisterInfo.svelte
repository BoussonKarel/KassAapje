<script lang="ts">
   import { onMount } from 'svelte'
   import { Link, navigate } from 'svelte-navigator'
   import { gqlHelper } from '../../../utils/graphQL'
   import NavigationBar from '../../NavigationBar.svelte'
   import SectionLoading from '../../Loading/SectionLoading.svelte'
   import Receipt from 'svelte-material-icons/Receipt.svelte'
   import Account from 'svelte-material-icons/Account.svelte'
   import Inventory from '../../../ExtraIcons/Inventory.svelte'
   import { authHelper } from '../../../utils/auth'
   import Delete from 'svelte-material-icons/Delete.svelte'
   import Store from 'svelte-material-icons/Store.svelte'

   export let register_id: string
   export let isOwner: boolean

   let deletePopup = false

   let fetchingState = '',
      register = undefined

   let errors = {
      remove: null,
   }

   const getRegisterInfo = async () => {
      fetchingState = 'loading'

      register = await gqlHelper.queries
         .register(register_id)
         .catch(e => {
            fetchingState = 'error'
         })
         .finally(() => {
            fetchingState = ''
         })
   }

   const openPopup = () => {
      deletePopup = true
   }
   const closePopup = () => {
      deletePopup = false
   }

   const removeRegister = async () => {
      gqlHelper.mutations
         .removeRegister(register_id)
         .catch(e => {
            errors.remove = `Er ging iets fout: ${e.message}`
         })
         .finally(() => {
            authHelper.refresh()
         })

      navigate(`../`, {state: {refresh: true}})
   }

   onMount(async () => {
      getRegisterInfo()
   })
</script>

<div class="c-page">
   {#if fetchingState === 'loading'}
      <SectionLoading />
   {:else if register}
      <NavigationBar title={register.name} />

      <div class="c-dashboard">
         <div class="c-dashboard__actions">
            <Link to="../" class="c-button c-button--action">
               <Store />
               Verkoop
            </Link>
            <Link to="../orders" class="c-button c-button--action">
               <Receipt />
               Orders
            </Link>
            <Link to="../products" class="c-button c-button--action">
               <Inventory />
               Producten
            </Link>
            <Link to="../roles" class="c-button c-button--action">
               <Account />
               Gebruikers
            </Link>
         </div>
         <div class="c-dashboard__info c-info">
            <div class="c-info__section">
               <div class="c-info__label">Vereniging</div>
               <div class="c-info__value">{register.organization.name}</div>
               <div class="c-info__label">Naam</div>
               <div class="c-info__value">{register.name}</div>
               <div class="c-info__label">Beschrijving</div>
               <div class="c-info__value">{register.description}</div>
            </div>
            {#if isOwner}
               <div class="c-info__edit">
                  <Link class="c-button" to="../edit">Bewerken</Link>
                  <button on:click|preventDefault={openPopup} class="c-textbutton__delete"
                     >Kassa verwijderen</button
                  >
               </div>
            {/if}
         </div>
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
               <span class="c-form-error">
                  {errors.remove ? errors.remove : ''}
               </span>
            </div>
         {/if}
      </div>
   {:else}
      <div class="o-container-center">
         <div class="c-bigcard {fetchingState === 'error' ? 'c-bigcard--error' : ''}">
            {#if fetchingState === 'error'}
               <span class="c-bigcard__text">Er ging iets fout bij het ophalen van de kassa.</span>
            {:else}
               <span class="c-bigcard__text">Kassa werd niet gevonden...</span>
            {/if}
         </div>
      </div>
   {/if}
</div>
