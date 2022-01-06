<script lang="ts">
   import type { ProductInput } from '../../../models/ProductInput'
   import { gqlHelper } from '../../../utils/graphQL'
   import { useNavigate } from 'svelte-navigator'
   const navigate = useNavigate()
   import { prevent_default } from 'svelte/internal'
   import { authHelper } from '../../../utils/auth'

   import NavigationBar from '../../NavigationBar.svelte'

   export let register_id

   let values: ProductInput = {
      register_id: register_id,
      name: '',
      price: null,
      stock_quantity: null,
   }

   async function handleSubmit(event) {
      console.log('values', values)
      console.log('submitted')

      let body: ProductInput = values

      await gqlHelper.mutations
         .addProduct(body)
         .catch(e => {
            // errors.submit = `Er ging iets fout: ${e.message}`
            console.log(e)
         })
         .finally(() => {
            authHelper.refresh()
         })

      console.log(body)

      navigate(-1)
   }
</script>

<div class="c-page">
   <div class="c-navigation">
      <NavigationBar title={'Product toevoegen'} />
   </div>
   <form class="c-form" name="AddOrganisation" on:submit|preventDefault={handleSubmit}>
      <div class="c-form-textinputs">
         <label class="c-form-label" for="name"> Naam: </label>
         <input
            class="c-form-textinput c-input"
            type="text"
            name="name"
            placeholder="Naam"
            bind:value={values.name}
         />
         <label class="c-form-label" for="price"> Prijs: </label>
         <input
            class="c-form-numberinput c-input"
            type="number"
            name="price"
            placeholder="1"
            bind:value={values.price}
         />

         <label class="c-form-label" for="stock_quantity"> Hoeveelheid: </label>
         <input
            class="c-form-numberinput c-input"
            type="number"
            name="stock_quantity"
            placeholder="1"
            bind:value={values.stock_quantity}
         />

         <button class="c-button-save"> Opslaan </button>
      </div>
   </form>
</div>
