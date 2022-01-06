<script lang="ts">
   import Minus from 'svelte-material-icons/Minus.svelte'
   import Plus from 'svelte-material-icons/Plus.svelte'

   export let product: any
   export let amount = 0

   const subtract = () => {
      console.log('sub')
   }
   const add = () => {
      console.log('add')
   }
   // Store stuff to subtract or add
</script>

<button class="c-pos-product {amount > 0 ? 'c-pos-product--contains' : ''}">
   <div class="c-pos-product__title">{product.name}</div>
   <div class="c-pos-product__amount">
      <button on:click={subtract} class="c-pos-product__button"><Minus /></button>
      <div class="c-pos-product__count">{amount}</div>
      <button on:click={add} class="c-pos-product__button"><Plus /></button>
   </div>
</button>
