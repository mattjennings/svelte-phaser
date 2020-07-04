<script>
  import Phaser from 'phaser'
  import {
    Game,
    Scene,
    Camera,
    Tilemap,
    TileLayer,
    ObjectLayer,
    Spawner,
    Text,
  } from 'svelte-phaser'
  import fragment from 'svelte-fragment'
  import LoadingBar from './LoadingBar.svelte'
  import * as Player from './Player.svelte'
  import { onMount } from 'svelte'

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
  <Scene
    key="main"
    physics={{ arcade: { width: 512, height: 512 } }}
    {preload}
    {create}>
    <template use:fragment slot="loading" let:progress>
      <LoadingBar x={128} y={112} {progress} />
    </template>

    <Spawner>
      <Tilemap
        key="tilemaps/level"
        tilesets={[{ key: 'tilesets/worldmap-props', name: 'worldmap-props' }, { key: 'tilesets/worldmap-road', name: 'worldmap-road' }, { key: 'tilesets/worldmap-water', name: 'worldmap-water' }]}>
        <TileLayer
          id="ground"
          name="ground"
          tilesets={['worldmap-props', 'worldmap-road', 'worldmap-water']}
          collisionTilesByProperty={{ collision: true }} />
        <TileLayer
          id="props"
          name="props"
          tilesets={['worldmap-props', 'worldmap-road', 'worldmap-water']}
          collisionTilesByProperty={{ collision: true }} />
        <TileLayer
          id="foreground"
          tilesets={['worldmap-props', 'worldmap-road', 'worldmap-water']} />
        <Camera
          bind:instance={camera}
          width={340}
          height={244}
          follow="player"
          roundPixels />
        <ObjectLayer id="objects" components={{ Player }} />
      </Tilemap>
    </Spawner>
  </Scene>
</Game>
