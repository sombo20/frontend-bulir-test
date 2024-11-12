// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/v1': {
        //target:"http://localhost:3000",
        target: 'https://backend-bulir-teste.onrender.com',
        changeOrigin: true
      },
    },
  },
});
