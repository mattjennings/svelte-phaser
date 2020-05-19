<script>
  import Phaser from 'phaser'
  import {
    Game,
    Scene,
    Text,
    Camera,
    Tilemap,
    TileLayer,
    ObjectLayer,
    Spawner,
  } from 'svelte-phaser'
  import fragment from 'svelte-fragment'
  import Player from './Player.svelte'

  let game

  $: window.game = game

  function preload(scene) {
    scene.load.tilemapTiledJSON('tilemaps/castle', 'assets/tilemap.json')
    scene.load.image('tilesets/castle', 'assets/castle-tileset.png')
    scene.load.spritesheet('textures/player', 'assets/adventurer.png', {
      frameWidth: 50,
      frameHeight: 37,
    })
  }

  function create(scene) {
    scene.anims.create({
      key: 'anims/player/idle',
      frames: scene.anims.generateFrameNumbers('textures/player', {
        start: 0,
        end: 3,
      }),
      frameRate: 6,
      repeat: -1,
    })
    scene.anims.create({
      key: 'anims/player/run',
      frames: scene.anims.generateFrameNumbers('textures/player', {
        start: 8,
        end: 13,
      }),
      frameRate: 8,
      repeat: -1,
    })
    scene.anims.create({
      key: 'anims/player/jump',
      frames: scene.anims.generateFrameNumbers('textures/player', {
        start: 14,
        end: 21,
      }),
      frameRate: 24,
    })
    scene.anims.create({
      key: 'anims/player/fall',
      frames: scene.anims.generateFrameNumbers('textures/player', {
        start: 22,
        end: 23,
      }),
      frameRate: 10,
      repeat: -1,
    })
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
  width={256}
  height={224}
  physics={{ default: 'arcade', arcade: { gravity: { y: 800 } } }}
  render={{ pixelArt: true }}
  scale={{ mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }}>
  <Scene
    key="main"
    physics={{ arcade: { width: 512, height: 256 } }}
    {preload}
    {create}>
    <template use:fragment slot="loading" let:progress>
      <Text
        x={100}
        y={100}
        text={`Loading... ${progress * 100}%`}
        color="white" />
    </template>

    <Spawner>
      <Tilemap
        key="tilemaps/castle"
        tilesets={[{ key: 'tilesets/castle', name: 'castle-tileset' }]}>
        <TileLayer
          id="ground"
          name="ground"
          tilesets={['castle-tileset']}
          collisionTilesByProperty={{ collision: true }} />
        <TileLayer id="bg" tilesets={['castle-tileset']} />
        <!-- <ObjectLayer id="enemies" components={{ }} /> -->
      </Tilemap>
    </Spawner>
    <Camera
      x={0}
      y={0}
      width={256}
      height={224}
      follow="player"
      roundPixels
      bounds={{ x: 0, y: 0, width: 512, height: 256 }}>
      <Player x={124} y={124} />
    </Camera>
  </Scene>
</Game>
