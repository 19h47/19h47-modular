import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

export default [
    {
        input: "src/main.js",
        output: [
            {
                file: "dist/main.cjs.js",
                format: "cjs",
            },
            {
                file: "dist/main.esm.js",
                format: "es",
            },
        ],
        plugins: [
            nodeResolve(),
            babel({
                exclude: ['node_modules/**']
            }),
            commonjs(),
            terser(),
        ],
    },
];
