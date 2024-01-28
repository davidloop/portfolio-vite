import { resolve } from 'path';
import { defineConfig } from 'vite';
import inject from "@rollup/plugin-inject";
import { htmlInjectionPlugin } from "vite-plugin-html-injection";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main:
                    resolve(__dirname, 'index.html')
            }
        }
    },
    plugins: [
        inject({ 
            $: 'jquery',
            jQuery: 'jquery',
        }),
        htmlInjectionPlugin({
            injections: [
                {
                    name: "Footer",
                    path: "./includes/footer.html",
                    type: "raw",
                    injectTo: "body",
                }
            ]
        })
    ]
});