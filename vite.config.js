import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
// import eslintPlugin from'vite-plugin-eslint'
function pathResolve(dir) {
  return resolve(process.cwd(), ".", dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: pathResolve("src"),
      },
      {
        find: "@images",
        replacement: pathResolve("src/assets/images"),
      },
      {
        find: "@components",
        replacement: pathResolve("src/components"),
      },
      {
        find: "@views",
        replacement: pathResolve("src/views"),
      },
      {
        find: "@hook",
        replacement: pathResolve("src/hook"),
      },
    ],
  },
  plugins: [
    vue(),
    // eslintPlugin({
    //   include: ['src/**/*.js','src/**/*.vue','src/*.js','src/*.vue']
    // })
  ],
  css: {
    preprocessorOptions: {
        less: {
            modifyVars: {
                hack: `true; @import (reference) "${resolve("src/assets/css/base.less")}";`,
            },
            javascriptEnabled: true,
        },
    },
  },
});
