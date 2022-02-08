import adapter from '@sveltejs/adapter-auto';

const production = process.env.NODE_ENV === 'production';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		vite: {
			optimizeDeps: {
				include: ['@carbon/charts'],
			},
			ssr: {
				noExternal: [production && '@carbon/charts'].filter(Boolean),
			},
		},
		files: {
		lib: ".",
	},
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	}
};

export default config;
