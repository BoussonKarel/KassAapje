<script lang="ts">
   import Pencil from 'svelte-material-icons/Pencil.svelte'
   import { Link } from 'svelte-navigator'
   import { formatHelper } from '../../../utils/formatHelper'

   export let isOwner
   export let product
</script>

<div class="c-table-products__item">
   <div>{product.name}</div>

   <div class="c-table-products__item--price">
      {formatHelper.price(product.price)}
   </div>

   <div class="c-table-products__item--stock">{product.stock_quantity}</div>
   <div class="c-table-products__item--edit">
      {#if isOwner}
         <Link to="{product.product_id}/edit">
            <div class="c-button__product-edit">
               <Pencil />
            </div>
            
         </Link>
      {/if}
   </div>
</div>
