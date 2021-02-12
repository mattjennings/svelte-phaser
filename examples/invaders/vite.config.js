const svite = require('svite')
const sviteConfig = {
  hot: true,
}

module.exports = (mode) => {
  /**
   * @type {import('vite').UserConfig}
   */
  const config = {
    // if you provide a svite plugin here, svite cli will use it instead of initializing one for you
    plugins: [svite(sviteConfig)],
    // if you don't use svite cli, you should provide rollupDedupe option, otherwise you risk duplicate svelte instances and errors
    rollupDedupe: [
      'svelte/animate',
      'svelte/easing',
      'svelte/internal',
      'svelte/motion',
      'svelte/store',
      'svelte/transition',
      'svelte',
      'phaser',
    ],

    alias: {
      phaser:
        mode === 'production'
          ? 'phaser/dist/phaser.min.js'
          : 'phaser/src/phaser.js',
    },
    optimizeDeps: {
      include: ['phaser'],
    },
  }

  return config
}
