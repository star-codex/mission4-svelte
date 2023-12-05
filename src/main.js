import '@sveltejs/kit/dist/index.css';
import app from './App.svelte';

const target = document.querySelector('#svelte');
const props = {}; // Add any initial props if needed

const instance = app(props);
instance.$on('navigate', (to) => history.pushState(null, null, to));
instance.$on('page-error', console.error);
instance.$on('loading', () => console.log('loading'));

instance.$on('loaded', () => {
	console.log('loaded');
});

instance.$on('destroy', () => {
	console.log('destroyed');
});

instance.$on('start', () => {
	console.log('started');
});

instance.$on('end', () => {
	console.log('ended');
});

instance.$on('state', ({ changed, current }) => {
	console.log('state', { changed, current });
});

instance.$on('error', (error) => {
	console.error(error);
});

instance.$mount(target);

export default app;
