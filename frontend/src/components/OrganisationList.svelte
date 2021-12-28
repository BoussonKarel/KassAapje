<script lang="ts">

   export let orgsCollapse
</script>

<ul class="c-sidebar__orgs--list {orgsCollapse ? 'u-hidden' : ''}">
   <slot />
</ul>
