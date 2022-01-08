<script lang="ts">
   import { onMount } from 'svelte'
   import { Link } from 'svelte-navigator'
   import { gqlHelper } from '../../../utils/graphQL'
   import NavigationBar from '../../NavigationBar.svelte'
   import SectionLoading from '../../Loading/SectionLoading.svelte'
   import Receipt from 'svelte-material-icons/Receipt.svelte'
   import Account from 'svelte-material-icons/Account.svelte'
   import Inventory from '../../../ExtraIcons/Inventory.svelte'

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
   {:else if register}
      <NavigationBar title={register.name} />

      <div class="c-dashboard">
         <div class="c-dashboard__actions">
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
               <div class="c-info__field">
                  <div class="c-info__label">Vereniging</div>
                  <div class="c-info__value">{register.organization.name}</div>
               </div>
               <div class="c-info__field">
                  <div class="c-info__label">Naam</div>
                  <div class="c-info__value">{register.name}</div>
               </div>
               <div class="c-info__field">
                  <div class="c-info__label">Beschrijving</div>
                  <div class="c-info__value">{register.description}</div>
               </div>
            </div>
            {#if isOwner}
               <div class="c-info__edit">
                  <Link to="/{orgId}/{id}/edit">
                     <button class="c-button">Bewerken</button>
                  </Link>
               </div>
            {/if}
         </div>
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
