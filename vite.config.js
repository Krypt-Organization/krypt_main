import path from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    nodePolyfills({
      exclude: [
        //"fs", // Excludes the polyfill for fs and node:fs
      ],
      overrides: {
        // Since `fs` is not supported in browsers, we can use the `memfs` package to polyfill it.
        fs: 'memfs',
      },
    }),
    react(), 
  ],
  resolve: {
    alias: {
      //add alias for nfts logic utils
      "@w3b": path.resolve(__dirname, "./src/w3b"),
    }
  },
})
