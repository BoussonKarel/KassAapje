import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['@urql/svelte'],
  },
  plugins: [svelte(), visualizer({filename: 'bundle_stats.html'})],
})
