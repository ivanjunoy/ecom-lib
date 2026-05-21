import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'playground',
  plugins: [react()],
  server: {
    port: 5173,
    fs: {
      allow: [resolve(__dirname)],
    },
  },
  build: {
    outDir: '../docs-dist',
    emptyOutDir: true,
  },
});
