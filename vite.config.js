import { defineConfig } from 'vite';

// Le site est publié sur GitHub Pages sous /contes-burkina/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/contes-burkina/' : '/',
  build: { chunkSizeWarningLimit: 1500 },
});
