<script lang="ts">
	export let name: string;
</script>

<main>
	<h1>Hello {name}!</h1>
	<div>
		<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	</div>
	
</main>

<style lang="scss">
	
  $color: orange;

h1 {
  color: $color;
}

div {
  background: green;

  > p {
	color: #fff;
  }
}
</style>