import { resolve } from 'path'
import { defineConfig } from 'vite'
import inject from "@rollup/plugin-inject";
import VitePluginWebpCompress from 'vite-plugin-webp-compress';
import { htmlInjectionPlugin } from "vite-plugin-html-injection";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main:
                    resolve(__dirname, 'index.html'),
                past:
                    resolve(__dirname, 'past/index.html'),
                hptouchsmartcommunity:
                    resolve(__dirname, 'past/hptouchsmartcommunity/index.html'),
                resume:
                    resolve(__dirname, 'resume/index.html')
            }
        }
    },
    plugins: [
        VitePluginWebpCompress(),
        inject({ 
            $: 'jquery',
            jQuery: 'jquery',
        }),
        htmlInjectionPlugin({
            injections: [
                {
                    name: "Meta",
                    path: "./includes/meta.html",
                    type: "raw",
                    injectTo: "head",
                },
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