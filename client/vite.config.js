import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
		exclude: [
			"@ionic/core/loader", //fix weird Vite error "outdated optimize dep"
		],
	},
});
