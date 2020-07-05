<script>
  import Phaser from 'phaser'
  import {
    Scene,
    Spawner,
    Text,
    SceneRouter,
    getSceneRouter,
  } from 'svelte-phaser'
  import fragment from 'svelte-fragment'
  import { onMount } from 'svelte'
  import LoadingBar from '../LoadingBar.svelte'
  import * as Player from '../Player.svelte'

  let game
  let camera
  $: window.game = game

  const router = getSceneRouter()
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

<Scene {...$$restProps} {preload} create={() => router.set('WorldMap')}>
  <template use:fragment slot="loading" let:progress>
    <LoadingBar x={170} y={122} {progress} />
  </template>
</Scene>
