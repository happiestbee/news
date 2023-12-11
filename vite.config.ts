import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs'

export default defineConfig({
	plugins: [sveltekit(), purgeCss()],
	optimizeDeps:{
		esbuildOptions:{
		  plugins:[
			esbuildCommonjs(['@google-ai/generativelanguage','google-auth-library'])
		  ]
		}
	}
});
