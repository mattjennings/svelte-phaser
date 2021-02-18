<script>
  import Phaser from 'phaser'
  import {
    Scene,
    Camera,
    Tilemap,
    TileLayer,
    ObjectLayer,
    Spawner,
    onGameEvent,
  } from 'svelte-phaser'
  import * as Player from '../Player.svelte'
  import { getRouter } from '../context'

  const router = getRouter()
  let scene
  let keys

  function create(scene) {
    Player.create(scene)

    keys = {
      space: scene.input.keyboard.addKey('space'),
    }
  }

  function update() {
    if (Phaser.Input.Keyboard.JustDown(keys.space)) {
      router.push('Battle', {
        hidePrevious: false,
      })
    }
  }
</script>

<Scene
  {...$$restProps}
  bind:instance={scene}
  physics={{ arcade: { width: 512, height: 512 } }}
  {create}
  {update}
>
  <Spawner>
    <Tilemap
      key="tilemaps/level"
      tilesets={[
        { key: 'tilesets/worldmap-props', name: 'worldmap-props' },
        { key: 'tilesets/worldmap-road', name: 'worldmap-road' },
        { key: 'tilesets/worldmap-water', name: 'worldmap-water' },
      ]}
    >
      <TileLayer
        id="ground"
        name="ground"
        tilesets={['worldmap-props', 'worldmap-road', 'worldmap-water']}
        collisionTilesByProperty={{ collision: true }}
      />
      <TileLayer
        id="props"
        name="props"
        tilesets={['worldmap-props', 'worldmap-road', 'worldmap-water']}
        collisionTilesByProperty={{ collision: true }}
      />
      <TileLayer
        id="foreground"
        tilesets={['worldmap-props', 'worldmap-road', 'worldmap-water']}
      />
      <ObjectLayer id="objects" components={{ Player }}>
        <Camera
          width={340}
          height={244}
          follow="player"
          roundPixels
          waitForTarget
        />
      </ObjectLayer>
    </Tilemap>
  </Spawner>
</Scene>
