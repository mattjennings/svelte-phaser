module.exports = {
  // if you will serve docs in subdirictory use '/subdir/'
  basepath: '/',

  // theme
  theme: './theme',

  title: {
    // constant part of page title
    main: 'svelte-phaser',

    // use first header's content as a part of page's title
    // it looks for `# Header` and `## Header` on the current page
    header: true,
  },

  // URL to your favicon
  favicon: 'static/favicon.png',

  pathes: {
    // directory for files, generated in development mode
    dev: '__DOCS__/dev',

    // directory for builted documentaton
    build: '__DOCS__/dist',
  },

  aliases: {
    './Ball.svelte': './src/components/Ball.svelte',
    // Virtual packages
    // <virtual_package_name>: <local_path>,
    //
    // Ex1: './Button.svelte': './../dist/Button.svelte',
    // Ex2: 'mylib': './../dist/index.js', (don't miss `index` and `.js` at the end!)
    //
    //  Then you can use:
    //  import Button from './Button.svelte';
    //  import { Input } from 'mylib';
  },

  preprocess: [
    require('svelte-preprocess')(),
    // preprocessors for Svelte if needed in Examples
    // syntax same as for `preprocess` option in `rollup-plugin-svelte`
    // Ex:  Import preprocessor at top of the config file:
    //          import {markdown} from 'svelte-preprocess-markdown';
    //      Then add it here:
    //          markdown({filetype: 'svelte'}),
  ],
}
