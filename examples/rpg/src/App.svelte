<script>
  import Phaser from 'phaser'
  import { Game, Scene, SceneRouter } from 'svelte-phaser'
  import Preload from './scenes/Preload.svelte'
  import Battle from './scenes/Battle.svelte'
  import WorldMap from './scenes/WorldMap.svelte'

  let game
  let camera
  $: window.game = game
</script>

<style>
  :global(body) {
    margin: 0;
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>

<Game
  bind:instance={game}
  width={340}
  height={244}
  type={Phaser.CANVAS}
  render={{ pixelArt: true }}
  physics={{ default: 'arcade' }}
  scale={{ mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }}>
  <SceneRouter initial="Preload" scenes={{ Preload, WorldMap, Battle }} />

</Game>
