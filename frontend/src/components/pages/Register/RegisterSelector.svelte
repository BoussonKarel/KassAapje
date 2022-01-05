<script lang="ts">
   import NavigationBar from '../../NavigationBar.svelte'
   import CardList from '../../Cards/CardList.svelte'
   import AddCard from '../../Cards/AddCard.svelte'
   import RegisterCard from '../../Cards/RegisterCard.svelte'
   import { onMount } from 'svelte'
   import SectionLoading from '../../Loading/SectionLoading.svelte'
   import SkeletonCard from '../../Cards/SkeletonCard.svelte'
   import Plus from 'svelte-material-icons/Plus.svelte'
   import { gqlHelper } from '../../../utils/graphQL'
   import { Link } from 'svelte-navigator'

   export let organization_id

   let fetchingState = '',
      registers = undefined

   const getRegisters = async () => {
      fetchingState = 'loading'

      console.log(organization_id)

      registers = await gqlHelper.queries
         .registers(organization_id)
         .catch(e => {
            fetchingState = 'error'
         })
         .finally(() => {
            fetchingState = ''
         })
      
         console.log(registers)

      // Filter which ones he has perms??
   }

   const addRegister = async () => {}

   onMount(() => {
      getRegisters()
   })
</script>

<div class="c-page">
   <NavigationBar title="Kassa's" />

   {#if fetchingState === 'loading'}
      <SectionLoading />

      <CardList>
         <SkeletonCard />
      </CardList>
   {:else if fetchingState === 'error'}
      Kon organisaties niet ophalen.
   {:else if registers && registers.length > 0}
      <CardList>
         {#each registers as register}
            <RegisterCard {register} />
         {/each}
         <AddCard page={'registers'} />
      </CardList>
   {:else}
   <div class="o-container-center">
      <div class="c-bigcard">
         <span class="c-bigcard__text c-bigcard__text--big">Geen kassa's gevonden...</span>

         <Link to='new' class="c-button-addorg">
            <div class="c-button-addorg__icon">
               <Plus />
            </div>
         </Link>
      </div>
   </div>
   {/if}
</div>
