<script lang="ts">
  import Delete from 'svelte-material-icons/Delete.svelte'
  import CloseCircle from 'svelte-material-icons/CloseCircle.svelte'
  import Minus from 'svelte-material-icons/Minus.svelte'
  import Plus from 'svelte-material-icons/Plus.svelte'
</script>

<div class="c-shoppingbasket">

    <div class="c-shoppingbasket-titlebar">
        <p class="c-shoppingbasket-title">Winkelmandje</p>
  <button class="c-shoppingbasket-empty">
      <Delete/>
  </button>
    </div>

    <div class="c-shoppingbasket-items">
        <div class="c-shoppingbasket-item">
            <div class="c-shoppingbasket-item-delete">
                <CloseCircle/>
            </div>
            <div class="c-shoppingbasket-item-name">
                Appeljenever
            </div>
            <div class="c-shoppingbasket-item-calc">
                <div class="c-shoppingbasket-item-less">
                    <Minus/>
                 </div>
                 <div class="c-shoppingbasket-item-amount">
                    4
                 </div>
                 <div class="c-shoppingbasket-item-more">
                     <Plus/>
                 </div>
            </div>
           
            <div class="c-shoppingbasket-item-price">
                € 14,0
            </div>
        </div>

        <div class="c-shoppingbasket-item">
            <div class="c-shoppingbasket-item-delete">
                <CloseCircle/>
            </div>
            <div class="c-shoppingbasket-item-name">
                Appeljenever
            </div>
            <div class="c-shoppingbasket-item-calc">
                <div class="c-shoppingbasket-item-less">
                    <Minus/>
                 </div>
                 <div class="c-shoppingbasket-item-amount">
                    4
                 </div>
                 <div class="c-shoppingbasket-item-more">
                     <Plus/>
                 </div>
            </div>
           
            <div class="c-shoppingbasket-item-price">
                € 14,0
            </div>
        </div>


    </div>
    <div class="c-shoppingbasket-divider">
        <span class="c-shoppingbasket-divider-line"/>
    </div>
   

    <div class="c-shoppingbasket-total">

    </div>
    <div class="c-shoppingbasket-checkout">
        <button class="c-shoppingbasket-checkout-button">Afrekenen</button>
    </div>
   
  
</div>
