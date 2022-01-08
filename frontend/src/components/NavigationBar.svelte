<script lang="ts">
   import ArrowLeftThick from 'svelte-material-icons/ArrowLeftThick.svelte'
   import { useNavigate } from 'svelte-navigator'

   export let title: string

   const navigate = useNavigate();
</script>

<div class="c-navigation">
   <div class="c-navigation__main">
      <button class="c-navigation__back" on:click={() => navigate('../')}>
         <ArrowLeftThick />
      </button>
      <h1 class="c-navigation__title">
         {title}
      </h1>
   </div>
   
   <div class="c-navigation__extra">
      <slot />
   </div>
</div>
