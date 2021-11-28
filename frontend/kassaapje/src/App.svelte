<script lang="ts">
	export let name: string;
	export let phrase: string;
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>{phrase}</p>
	<div class="phrase">
		<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	</div>
	
</main>
