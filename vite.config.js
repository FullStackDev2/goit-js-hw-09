import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig({
  

  base: '/goit-js-hw-09/',


  define: {
    global: {},   
  },

  build: {
    sourcemap: true,
    outDir: 'dist',
    emptyOutDir: true,

    rollupOptions: {
      input: glob.sync('./*.html').concat(glob.sync('./src/*.html')),
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },

  plugins: [
    injectHTML(),
    FullReload(['./src/**/**.html']),
    SortCss({
      sort: 'mobile-first',
    }),
  ],
});
