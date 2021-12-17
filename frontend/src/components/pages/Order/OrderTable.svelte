<script lang="ts">
import OrderTableItem from "./OrderTableItem.svelte";


</script>

<div class="c-table c-table-orders">
    <div class="c-table-orders__header">
        <div class="c-table-orders__header--item">Naam</div>
        <div class="c-table-orders__header--item">Hoeveelheid</div>
        <div class="c-table-orders__header--item">Bedrag</div>
     </div>
     <div class="c-table-orders__content">
      <OrderTableItem/>
      <OrderTableItem/>
      <OrderTableItem/>
      <OrderTableItem/>
      <OrderTableItem/>

      
   
  
      
     </div>

</div>