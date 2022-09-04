import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    // all the usual config goes here...

    vite: {
        resolve: {
            alias: {
                "@/": `${path.resolve(__dirname, "src")}/`,
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "@/styles/vars.scss";`,
                },
            },
        },
    },
};
