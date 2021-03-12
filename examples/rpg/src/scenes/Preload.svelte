<script>
  import { Scene } from 'svelte-phaser'
  import LoadingBar from '../LoadingBar.svelte'
  import * as Player from '../Player.svelte'
  import { getRouter } from '../context'
  import WorldMap from './WorldMap.svelte'

  const router = getRouter()

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
</script>

<Scene
  {...$$restProps}
  {preload}
  create={() => $router.go({ component: WorldMap })}
  let:progress
>
  <slot slot="loading">
    <LoadingBar x={170} y={122} {progress} />
  </slot>
</Scene>
