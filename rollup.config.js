// rollup.config.js
// https://github.com/rollup/rollup-plugin-svelte

import svelte from 'rollup-plugin-svelte';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    entry: 'src/main.js',
    dest: 'docs/bundle.js',
    format: 'iife',
    watch: {
        exclude: ['node_modules/**']
    },
    plugins: [
        nodeResolve({
            jsnext: true,
            main: true
        }),
        commonjs({
            include: 'node_modules/**',  // Default: undefined
            sourceMap: false,  // Default: true
        }),
        svelte({
            // By default, all .html and .svelte files are compiled
            // extensions: [ '.my-custom-extension' ],

            // You can restrict which files are compiled
            // using `include` and `exclude`
            // include: 'src/components/**/*.html',

            // By default, the client-side compiler is used. You
            // can also use the server-side rendering compiler
            // generate: 'ssr',

            // Extract CSS into a separate file (recommended).
            // See note below
            css: function(css) {
                // css.code, css.map
                // pass false as second arg for no sourcemap.
                css.write('docs/bundle.css');
            }
        })
    ]
}