<script lang="ts">
   export let collapsed
</script>

<ul class="c-sb-orgs {collapsed ? 'u-hidden' : ''}">
   <slot />
</ul>
