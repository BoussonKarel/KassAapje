<script lang="ts">
   import Pencil from 'svelte-material-icons/Pencil.svelte'
   import { Link } from 'svelte-navigator'

   export let isOwner
</script>

<div class="c-table-products__item">
   <div>Appeljenever</div>

   <div class="c-table-products__item--price">
      <div>€</div>
      <div>40</div>
   </div>

   <div class="c-table-products__item--stock">250</div>
   <div class="c-table-products__item--edit">
      {#if isOwner}
         <Link to="edit">
            <Pencil />
         </Link>
      {/if}
   </div>
</div>
