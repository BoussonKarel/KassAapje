<script lang="ts">

   export let orgsCollapse
</script>

<ul class="c-sidebar__orglist--list {orgsCollapse ? 'u-hidden' : ''}">
   <slot />
</ul>
