<script lang="ts">
import { useDeviceLanguage } from "@firebase/auth";
import PopupTable from "./PopupTable.svelte";


</script>

<div class="c-popup-order">
    <p class="c-popup-order__title">
        Bestelling afronden
    </p>

   
    <PopupTable/>

     <div class="u-toolbar-amount c-popup-order__amount">
         <div class="u-toolbar-amount__title">Totaal:</div>
         <div class="u-horizontal">
          <div class="u-toolbar-amount__symbol">€</div>
          <div class="u-toolbar-amount__number">420,60</div>
         </div>
         
      </div>
    <button class="c-button-save u-popup-submit">Bevestigen</button>
    
  </div>