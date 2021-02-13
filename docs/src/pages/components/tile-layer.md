# TileLayer

Renders a tile layer from the tilemap

## Usage

```example
<script>
  import Phaser from 'phaser'
  import { onMount } from 'svelte'
  import { Game, Scene, Tilemap, TileLayer } from 'svelte-phaser'
</script>

<Game width={512} height={256} scale={{ autoCenter: Phaser.Scale.CENTER_BOTH }}>
  <Scene
    key="main"
    preload={(scene) => {
      scene.load.tilemapTiledJSON('tilemaps/main-level', '/static/tilemaps/castle.json')
      scene.load.image('tilesets/castle', '/static/tilemaps/castle-tileset.png')
    }}
  >
    <Tilemap
      key="tilemaps/main-level"
      tilesets={[{ key: 'tilesets/castle', name: 'castle-tileset' }]}>
      <TileLayer
        id="bg"
        tilesets={['castle-tileset']} />
      <TileLayer
        id="ground"
        tilesets={['castle-tileset']} />
    </Tilemap>
  </Scene>
</Game>

```

## Properties

```properties
./../packages/svelte-phaser/dist/TileLayer.svelte
```
