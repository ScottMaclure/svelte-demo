// rollup.config.js
import * as fs from 'fs';
import svelte from 'rollup-plugin-svelte';

export default {
  entry: 'src/main.js',
  dest: 'docs/bundle.js',
  format: 'iife',
  watch:
  {
    exclude: ['node_modules/**']
  },
  plugins: [
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
      css: function ( css ) {
        fs.writeFileSync('docs/main.css', css);
      }
    })
  ]
}