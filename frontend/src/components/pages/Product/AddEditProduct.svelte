<script lang="ts">
   import type { ProductInput } from '../../../models/ProductInput'
   import type { ProductUpdateInput } from '../../../models/ProductUpdateInput'
   import { gqlHelper } from '../../../utils/graphQL'
   import { useNavigate } from 'svelte-navigator'
   const navigate = useNavigate()
   import { onMount, prevent_default } from 'svelte/internal'
   import { authHelper } from '../../../utils/auth'
   import NavigationBar from '../../NavigationBar.svelte'
   import { formHelper } from '../../../utils/formHelper'
   import SectionLoading from '../../Loading/SectionLoading.svelte'
import Delete from 'svelte-material-icons/Delete.svelte';
import { refresh } from '../../../utils/refresh';

   const { DEFAULT_ERROR, validateNotEmpty, validateEmail, validateNumber } = formHelper()

   // INPUTS
   let valid = false

   let deletePopup = false

   export let product_id = ''

   export let register_id:string

   const openPopup = () => {
      deletePopup = true
   }
   const closePopup = () => {
      deletePopup = false
   }

   const removeProduct = async () => {
      gqlHelper.mutations
         .removeProduct(product_id)
         .catch(e => {
            errors.submit = `Er ging iets fout: ${e.message}`
         })
         .finally(() => {
            refresh()
            navigate(-1)
         })
      
      
   }

   let values: ProductInput = {
      register_id: register_id,
      name: '',
      price: null,
      stock_quantity: null,
   }

   let errors = {
      name: null,
      price: null,
      stock_quantity: null,
      submit: null,
   }

   let fetchingState = '',
      product = undefined

   async function handleSubmit() {
      for (let field in values) {
         if (field == 'price' || field == 'stock_quantity') {
            if (!validateNumber(values[field])) {
               errors[field] = DEFAULT_ERROR.number
            } else {
               errors[field] = null
            }
         } else {
            if (!validateNotEmpty(values[field])) {
               errors[field] = DEFAULT_ERROR.empty
            } else {
               errors[field] = null
            }
         }
      }

      if (noErrors()) {
         valid = true
      } else {
         valid = false
         errors.submit = DEFAULT_ERROR.submit
      }

      if (valid) {
         if (product_id != '') {
            //update existing product

            let body: ProductUpdateInput = {
               product_id: product_id,
               name: values.name,
               price: values.price,
               stock_quantity: values.stock_quantity,
            }

            await gqlHelper.mutations
               .updateProduct(body)
               .catch(e => {
                  errors.submit = `Er ging iets fout: ${e.message}`
               })
               .finally(() => {
                  authHelper.refresh()
               })


            navigate(-1)
         } else {
            //new product add

            let body: ProductInput = values

            await gqlHelper.mutations
               .addProduct(body)
               .catch(e => {
                  errors.submit = `Er ging iets fout: ${e.message}`
               })
               .finally(() => {
                  authHelper.refresh()
               })

            navigate(-1)
         }
      }
   }

   const noErrors = () => {
      for (var error in errors) {
         if (errors[error] !== null && errors[error] !== '') return false
      }
      return true
   }

   const handleInput = e => {
      var field: string = e.target.name

      if (field == 'price' || field == 'stock_quantity') {
         if (!validateNumber(values[field])) {
            errors[field] = DEFAULT_ERROR.number
         } else {
            errors[field] = null
         }
      } else {
         if (!validateNotEmpty(values[field])) {
            errors[field] = DEFAULT_ERROR.empty
         } else {
            errors[field] = null
         }
      }

      if (!errors.name && !errors.price && !errors.stock_quantity) {
         errors.submit = null
      }
   }

   const setProductInfo = async () => {
      values.register_id = register_id
      values.name = product.name
      values.price = product.price
      values.stock_quantity = product.stock_quantity
   }

   const getProductInfo = async () => {
      fetchingState = 'loading'

      product = await gqlHelper.queries
         .product(product_id)
         .catch(e => {
            fetchingState = 'error'
         })
         .finally(() => {
            fetchingState = ''
         })
      setProductInfo()
   }

   onMount(async () => {
      if (product_id != '') {
         getProductInfo()
      }
   })
</script>

<div class="c-page">
   {#if fetchingState === 'loading'}
      <SectionLoading />
   {:else if fetchingState === 'error'}
      Error getting organization
   {:else if product || product_id == ''}
      <NavigationBar title={product_id != '' ? 'Product bewerken' : 'Product toevoegen'} />

      <form class="c-form" name="AddOrganisation" on:submit|preventDefault={handleSubmit}>
         <div class="c-form-textinputs">
            <label class="c-form-label" for="name"> Naam: *</label>
            <input
               class="c-form-textinput c-input {errors.name ? 'has-error' : ''}"
               type="text"
               name="name"
               placeholder="Naam"
               bind:value={values.name}
               on:blur={handleInput}
            />
            <span class="c-form-error">
               {errors.name ? errors.name : ''}
            </span>

            <label class="c-form-label" for="price"> Prijs: *</label>
            <input
               class="c-form-numberinput c-input {errors.price ? 'has-error' : ''}"
               type="number"
               name="price"
               step="any"
               placeholder="1"
               bind:value={values.price}
               on:blur={handleInput}
            />
            <span class="c-form-error">
               {errors.price ? errors.price : ''}
            </span>

            <label class="c-form-label" for="stock_quantity"> Hoeveelheid: *</label>
            <input
               class="c-form-numberinput c-input {errors.stock_quantity ? 'has-error' : ''}"
               type="number"
               name="stock_quantity"
               placeholder="1"
               bind:value={values.stock_quantity}
               on:blur={handleInput}
            />

            <span class="c-form-error">
               {errors.stock_quantity ? errors.stock_quantity : ''}
            </span>

            <p class="c-form__info">(*) Verplicht veld</p>

            <span class="c-form-error">
               {errors.submit ? errors.submit : ''}
            </span>

            <div class="c-form-altinputs">
               <button class="c-button"> {product_id == '' ? 'opslaan' : 'Bewerken'} </button>

               {#if product_id}
               <button on:click|preventDefault={openPopup} class="c-textbutton__delete"
                   >Product verwijderen</button
                >
               {/if}
               
            </div>
            {#if deletePopup}
            <div class="c-popup-delete">
               <div class="c-popup-delete__info">
                  <div class="c-popup-delete__title">Product verwijderen?</div>
                  <div>Deze actie is onomkeerbaar.</div>
               </div>

               <div class="c-popup-delete__buttons">
                  <button class="c-button u-button__cancel" on:click={closePopup}>Annuleren</button>
                  <button
                     class="c-button u-button__delete u-button__delete-icon"
                     on:click={removeProduct}
                  >
                     <Delete /></button
                  >
               </div>
            </div>
         {/if}
         </div>
      </form>
   {/if}
</div>
