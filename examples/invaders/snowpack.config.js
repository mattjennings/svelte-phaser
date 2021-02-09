module.exports = {
  extends: '@snowpack/app-scripts-svelte',
  devOptions: {},
  packageOptions: {
    knownEntrypoints: ['svelte'],
    rollup: {
      dedupe: ['svelte', 'phaser'],
    },
  },
  mount: {
    '../../packages/svelte-phaser': '/svelte-phaser',
  },
  alias: {
    'svelte-phaser': '../../packages/svelte-phaser/src',
  },
}
