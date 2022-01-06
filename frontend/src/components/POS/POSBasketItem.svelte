<script>
   import { formatHelper } from "../../utils/formatHelper";
  import CloseCircle from "svelte-material-icons/CloseCircle.svelte";
  import Minus from "svelte-material-icons/Minus.svelte";
  import Plus from "svelte-material-icons/Plus.svelte";

  export let product;
</script>

<div class="c-basket-item">
   <button class="c-basket-item__button">
      <CloseCircle />
   </button>
   <div class="c-basket-item__name">{product.name}</div>
   <button class="c-basket-item__button c-basket-item__button--minus">
      <Minus />
   </button>
   <div class="c-basket-item__count">5</div>
   <button class="c-basket-item__button c-basket-item__button--plus">
      <Plus />
   </button>
   <div class="c-basket-item__price">{formatHelper.price(product.price)}</div>
</div>
