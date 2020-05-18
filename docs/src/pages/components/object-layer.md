# ObjectLayer

Spawns Svelte components using the object layer from the tilemap. It requires a `Spawner` component
to be above it (usually above the `<Tilemap>`).

ObjectLayer will look for objects with a custom property "component". If this is defined, and the value exists in
the `components` prop, it will spawn the component. Any other properties defined will be
passed into the component as props.

![object layer](static/images/tiled-object-layer.png)

## Usage

```example
<script>
  import { onMount } from 'svelte'
  import { Game, Scene, Spawner, Tilemap, TileLayer, ObjectLayer } from 'svelte-phaser'
  import Ball from './Ball.svelte'
</script>

<Game
  width={512}
  height={256}
  physics={{
    default: 'arcade',
    arcade: {
      gravity: {
        y: 800
      }
    }
  }}>
  <Scene
    key="main"
    preload={(scene) => {
      scene.load.image('textures/ball', '/static/images/ball.png')
      scene.load.tilemapTiledJSON('tilemaps/main-level', '/static/tilemaps/castle.json')
      scene.load.image('tilesets/castle', '/static/tilemaps/castle-tileset.png')
    }}
  >
  <Spawner>
    <Tilemap
      key="tilemaps/main-level"
      tilesets={[{ key: 'tilesets/castle', name: 'castle-tileset' }]}>
      <ObjectLayer id="objects" components={{ Ball }} />

      <TileLayer
        id="bg"
        tilesets={['castle-tileset']} />
      <TileLayer
        id="ground"
        name="ground"
        tilesets={['castle-tileset']}
        collisionTilesByProperty={{ collision: true }} />
    </Tilemap>
    </Spawner>
  </Scene>
</Game>

```

## Properties

```properties
./../packages/svelte-phaser/src/ObjectLayer.svelte
```
