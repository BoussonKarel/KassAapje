import App from './App.svelte';
import './styles/screen.scss'

const app = new App({
	target: document.body,
	props: {
		name: 'kasaapje',
		phrase: 'beetje info hier'
	}
});

export default app;