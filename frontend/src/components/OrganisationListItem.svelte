<script lang="ts">
   import ChevronUp from 'svelte-material-icons/ChevronUp.svelte'

   let orgCollapse = true

   function toggleOrgCollapse() {
      orgCollapse = !orgCollapse

      console.log('collapsed one org')
      console.log(orgCollapse)
   }
</script>

<div  class="c-sidebar__org">
   <div on:click={toggleOrgCollapse} class="c-sidebar__org--title">
      <li class="c-sidebar__org--title-text">Scouts Beselare</li>
      <div class="c-sidebar__org--title-chevron {orgCollapse ? 'u-flip' : ''}">
         <ChevronUp />
      </div>
   </div>

   <ul class=" c-sidebar__org--list {orgCollapse ? 'u-hidden' : ''}">
      <li class="c-sidebar__org--item">Kerstmarkt</li>
      <li class="c-sidebar__org--item">Pasta Avond</li>
      <li class="c-sidebar__org--item">Lorem</li>
      <li class="c-sidebar__org--item">Ipsum</li>
   </ul>
</div>
