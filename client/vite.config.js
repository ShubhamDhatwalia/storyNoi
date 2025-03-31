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
            // Further split vendor chunks based on specific libraries
            if (id.includes('react')) return 'react';  // React-specific chunk
            if (id.includes('lodash')) return 'lodash';  // Split lodash
            if (id.includes('moment')) return 'moment';  // Split moment.js
            if (id.includes('axios')) return 'axios';  // Split axios
          }
        },
      },
    }
    
  },
  esbuild: {
    treeShaking: true, 
  },
});
