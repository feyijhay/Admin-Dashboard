import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "./", // Ensures correct asset paths
  build: {
    target: "esnext", // 'es2015' is fine, but 'esnext' optimizes better
    outDir: "dist",
  },
  server: {
    host: true, // Ensures the app is accessible in the local network
    port: 5173, // Vite default port, can be changed if needed
  },
  preview: {
    port: 5000, // Makes sure Vite preview works correctly
  },
});
