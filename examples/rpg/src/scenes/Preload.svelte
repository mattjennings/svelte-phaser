<script>
  import { Scene } from 'svelte-phaser'
  import LoadingBar from '../LoadingBar.svelte'
  import * as Player from '../Player.svelte'
  import { getRouter } from '../context'

  const router = getRouter()
  let game
  let camera
  $: window.game = game

  function preload(scene) {
    scene.load.tilemapTiledJSON('tilemaps/level', 'assets/tilemaps/level.json')
    scene.load.image(
      'tilesets/worldmap-props',
      'assets/tilemaps/worldmap-props.png'
    )
    scene.load.image(
      'tilesets/worldmap-water',
      'assets/tilemaps/worldmap-water.png'
    )
    scene.load.image(
      'tilesets/worldmap-road',
      'assets/tilemaps/worldmap-road.png'
    )

    Player.preload(scene)
  }

  function create(scene) {
    Player.create(scene)
  }
</script>

<Scene
  {...$$restProps}
  {preload}
  create={() => router.set('WorldMap')}
  let:progress
>
  <slot slot="loading">
    <LoadingBar x={170} y={122} {progress} />
  </slot>
</Scene>
