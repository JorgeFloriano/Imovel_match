import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.tsx',
      refresh: true,
    }),
    react(),
    tailwindcss(),
  ],
  build: {
    manifest: true,
    outDir: 'public/build',
    rollupOptions: {
      output: {
        // Disable code splitting completely
        inlineDynamicImports: true,
        // Consistent naming pattern
        entryFileNames: 'assets/app.[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    },
    // Ensure all assets are properly included
    assetsInlineLimit: 0
  },
  base: '/build/',
});