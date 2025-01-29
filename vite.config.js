import path from "path";
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      exclude: ['fs', 'path', 'os'], // Exclude Node.js modules from polyfilling
    }),
  ],
  resolve: {
    alias: {
      "@w3b": path.resolve(__dirname, "./src/w3b"),
    },
  },
  build: {
    rollupOptions: {
      external: ['fs', 'path', '@metaplex-foundation/umi-eddsa-web3js'], // Exclude these from bundling
    },
  },
});
