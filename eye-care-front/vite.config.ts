import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  assetsInclude: ["**/*.glb"],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/variable.scss";`,
      },
    },
  },
});
