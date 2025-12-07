import { defineConfig } from "vite";
import { resolve } from "path";
import { globSync } from "glob";

export default defineConfig({
  root: "src",
  base: "/goit-js-hw-09/",
  define: { global: {} },

  build: {
    outDir: "../dist",
    emptyOutDir: true,

    rollupOptions: {
      input: {
        index: resolve(__dirname, "src/index.html"),
        ...Object.fromEntries(
          globSync("src/*.html").map((file) => [
            file.replace("src/", "").replace(".html", ""),
            resolve(__dirname, file),
          ])
        ),
      },
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },

    modulePreload: {
      polyfill: false,  
    },
  },
});
