module.exports = {
  extends: '@snowpack/app-scripts-svelte',
  devOptions: {},
  install: ['svelte'],
  installOptions: {
    rollup: {
      dedupe: ['svelte', 'phaser'],
    },
  },
}
