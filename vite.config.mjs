import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [
    {
      name: 'source-jsx',
      enforce: 'pre',
      async transform(code, id) {
        // D3 3 predates strict CommonJS bundling and reads the browser global through `this`.
        if (id.endsWith('/node_modules/d3/d3.js')) {
          return code.replace(/\}\(\);?\s*$/, '}.call(globalThis);');
        }
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
