import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'kasaapje',
		phrase: 'beetje info hier'
	}
});

export default app;