import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';

// D3 3 reads browser globals through the IIFE receiver.
const d3BrowserGlobal = {
  name: 'd3-browser-global',
  enforce: 'pre',
  transform(code, id) {
    if (id.endsWith('/node_modules/d3/d3.js')) {
      return code.replace(/\}\(\);?\s*$/, '}.call(globalThis);');
    }
  },
};

export default defineConfig({
  base: './',
  optimizeDeps: { rolldownOptions: { plugins: [d3BrowserGlobal] } },
  plugins: [
    d3BrowserGlobal,
    {
      name: 'source-jsx',
      enforce: 'pre',
      async transform(code, id) {
        if (/\/src\/.*\.js$/.test(id)) {
          return transformWithEsbuild(code, id, { loader: 'jsx', jsx: 'transform' });
        }
      },
    },
    react({ jsxRuntime: 'classic' }),
  ],
  define: { 'process.env.PUBLIC_URL': JSON.stringify('') },
  build: {
    outDir: 'build',
    minify: 'terser',
    // Rickshaw's inheritance helper identifies this argument by its literal name.
    terserOptions: { mangle: { reserved: ['$super'] } },
  },
});
