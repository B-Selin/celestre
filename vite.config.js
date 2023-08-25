import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        ws: true,
        onError: (err, req, res) => {
          console.log('proxy error', err);
        },
        onProxyReq: (proxyReq, req, res) => {
          console.log('Sending Request to the Target:', req.method, req.url);
        },
        onProxyRes: (proxyRes, req, res) => {
          console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
        },
      },
    },
  },
});
