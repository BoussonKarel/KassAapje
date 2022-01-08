   <script lang="ts">
   import type { Order } from '../../../models/Order';
   import { gqlHelper } from '../../../utils/graphQL';
   import { onMount } from 'svelte';
   import Pencil from 'svelte-material-icons/Pencil.svelte';
   import NavigationBar from '../../NavigationBar.svelte';
   import { formatHelper } from '../../../utils/formatHelper';
   import { orderHelper } from '../../../utils/orderHelper';
   import {refreshStore } from '../../../utils/refresh';
   import SkeletonCard from '../../Cards/SkeletonCard.svelte';

   export let register_id;

   let fetchingState = '',
   orders: Order[] = undefined;

   const getOrders = async () => {
      fetchingState = 'loading'

      orders = await gqlHelper.queries
         .orders(register_id)
         .then(result => {
            fetchingState = ''
            return result
         })
         .catch(() => {
            fetchingState = 'error'
         })
   }

   refreshStore.subscribe(() => {
      getOrders();
   })
</script>

<div class="c-page">
      <NavigationBar title={'Bestellingen'} />
   <div class="u-toolbar">
      <!-- <div class="c-selector">
         <p class="c-selector-title">Periode:</p>
         <select class="c-selector-unit" id="timeframe" name="timeframe">
            <option class="c-selector__option">Laatste Week </option>
            <option class="c-selector__option">Laatste Maand </option>
            <option class="c-selector__option">Altijd </option>
         </select>
      </div> -->

      <div class="u-toolbar-amount">
         <div class="u-toolbar-amount__title">Totaal:</div>
         <div class="u-toolbar-amount__symbol">€</div>
         <div class="u-toolbar-amount__number">{fetchingState === 'loading' ? '...' : orders ? orderHelper.totalAll(orders) : '???'}</div>
      </div>
   </div>

      {#if fetchingState === 'loading'}
         <div class="c-orderlist">
            <SkeletonCard />
         </div>
      {:else if orders && orders.length > 0}
      <div class="c-orderlist">
         {#each orders as order}
            <div class="c-order">
               <div class="c-order__header">
                  <div class="c-order__title">
                     <span class="c-order__id">
                        # {order.order_id}
                     </span>
                     <span class="c-order__time">
                        {formatHelper.dateTime(order.timestamp)}
                     </span>
                  </div>
                  <button disabled class="c-order__edit">
                     <Pencil />
                  </button>
               </div>
               <div class="c-order__summary">
                  <div class="c-order__content">
                     {#if order.order_items && order.order_items.length > 0}
                        {#each order.order_items as order_item}
                           {order_item.quantity}x {order_item.product.name}<br />
                        {/each}
                     {/if}
                  </div>
                  <div class="c-order__price">
                     {formatHelper.price(orderHelper.total(order))}
                  </div>
               </div>
            </div>
         {/each}
         </div>
      {:else}
         <div class="o-container-center">
            <div class="c-bigcard {fetchingState === 'error' ? 'c-bigcard--error' : ''}">
               <div class="c-bigcard__text">
                  {#if fetchingState === 'error'}
                     Kon orders niet ophalen
                  {:else}
                     Je hebt nog geen bestellingen
                  {/if}
               </div>
            </div>
         </div>
      {/if}
   </div>