<script>
  import CloseCircle from "svelte-material-icons/CloseCircle.svelte";
  import Minus from "svelte-material-icons/Minus.svelte";
  import Plus from "svelte-material-icons/Plus.svelte";
</script>

<div class="c-basket-item">
   <div class="c-basket-item__button">
      <CloseCircle />
   </div>
   <div class="c-basket-item__name">Appeljenever</div>
   <div class="c-basket-item__button c-basket-item__button--minus">
      <Minus />
   </div>
   <div class="c-basket-item__count">5</div>
   <div class="c-basket-item__button c-basket-item__button--plus">
      <Plus />
   </div>
   <div class="c-basket-item__price">€ 10,00</div>
</div>
