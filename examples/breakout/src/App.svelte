<script>
  import Phaser from 'phaser'
  import { Game, Scene, Text } from 'svelte-phaser'
  import Breakout from './Breakout.svelte'
  import LoadingBar from './LoadingBar.svelte'

  function preload(scene) {
    scene.load.atlas('assets', 'assets/breakout.png', 'assets/breakout.json')
  }
</script>

<Game
  width={800}
  height={800}
  physics={{ default: 'arcade' }}
  scale={{ mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }}
>
  <Scene key="main" {preload} let:progress>
    <slot slot="loading">
      <LoadingBar x={400} y={400} {progress} />
    </slot>
    <Breakout />
  </Scene>
</Game>

<style>
  :global(body) {
    margin: 0;
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
