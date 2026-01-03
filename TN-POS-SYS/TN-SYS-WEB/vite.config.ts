import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  // Load env file based on mode (development or production)
  const env = loadEnv(mode, process.cwd(), '');
  
  // Priority: process.env.API_TARGET > .env VITE_API_TARGET > localhost
  const apiTarget = process.env.API_TARGET || env.VITE_API_TARGET || 'http://localhost:3000';

  return {
    root: './',
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
      },
    },
    server: {
      port: 3001,
      open: true,
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
  };
});

