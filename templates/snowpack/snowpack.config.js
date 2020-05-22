module.exports = {
  extends: '@snowpack/app-scripts-svelte',
  devOptions: {},
  installOptions: {
    rollup: {
      dedupe: ['svelte', 'phaser'],
      plugins: [require('rollup-plugin-svelte')()],
    },
  },
}
