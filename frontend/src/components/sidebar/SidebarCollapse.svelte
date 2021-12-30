<script lang="ts">
   import { createEventDispatcher } from 'svelte'

   import ArrowCollapseLeft from 'svelte-material-icons/ArrowCollapseLeft.svelte'

   export let sidebarCollapsed;

   const dispatch = createEventDispatcher()
</script>

<div
   on:click={() => dispatch('collapse')}
   class="c-sb-button c-sb-button--bottom {sidebarCollapsed ? 'c-sb-button--collapsed' : ''}"
>
   <div class="c-sb-button__icon c-sb-button__icon--collapse">
      <ArrowCollapseLeft />
   </div>

   <div class="c-sb-button__text u-collapsible">Inklappen</div>
</div>
