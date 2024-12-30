import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
	plugins: [react(), svgr()],
	assetsInclude: ["**/*.glb"],
	define: {
		"process.env": process.env,
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use "./src/variable.scss" as *;`,
			},
		},
	},
});
