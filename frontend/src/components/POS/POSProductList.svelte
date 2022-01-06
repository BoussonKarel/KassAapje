<script lang="ts">
import POSProduct from './POSProduct.svelte'

const product = {
    name: "Test"
}
</script>

<div class="c-pos-list">
    <POSProduct {product} />
    <POSProduct {product} amount={5} />
    <POSProduct {product} />
    <POSProduct {product} />
    <POSProduct {product} />
    <POSProduct {product} amount={4} />
    <POSProduct {product} amount={2} />
</div>