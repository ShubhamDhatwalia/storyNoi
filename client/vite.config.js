import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'esnext', // Use latest ESNext for better optimizations
    minify: 'esbuild', // Use esbuild for faster minification
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('aos')) return 'aos'; // Separate AOS animations
            if (id.includes('react')) return 'vendor'; // Separate React libraries
          }
        },
      },
    },
  },
  esbuild: {
    treeShaking: true, // Remove unused JS
  },
});
