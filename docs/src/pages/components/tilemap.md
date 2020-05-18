# Tilemap

Creates a Tilemap. It won't render anything on its own, so see [TileLayer](components/tile-layer) for rendering the layers.

# Using Tiled

It is recommended to use [Tiled](https://www.mapeditor.org/) to create your tilemaps. I have only used this component with Tiled, so YMMV if you decide to create your tilemaps on your own.

### Creating a Tilemap

If you've opened Tiled for the first time, you should see a blank page with a "New map..." button. Click that to create a new tilemap, otherwise you can use `File -> New -> New map`

Make sure the following settings are set, and then save.

- **Orientation** - Orthogonal
- **Tile layer format** - Base64 (uncompressed)

![new tilemap](static/images/tiled-new-map-1.png)

### Creating a Tileset

Now we need to add a tileset. Go to `File -> New -> New tileset`

Make sure the following settings are set, and then save.

- **Type** - Based on Tileset Image
- **Embed in Map** - checked

![new tilemap](static/images/tiled-create-tileset.png)

Now you're ready to start making your tilemap.

### Exporting a Tilemap

Once you're ready to try it out in your game, go to `File -> Export As` and save it as a JSON file. This is the file that you want to load
in your game, as well as each of the tileset images.

Pro tip: You can open the JSON file with Tiled rather than the .tmx file, meaning saves will update the JSON file and you won't
have to keep exporting each time.

## Usage

```example
<script>
  import { onMount } from 'svelte'
  import { Game, Scene, Tilemap, TileLayer } from 'svelte-phaser'
</script>

<Game width={512} height={256}>
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
./../packages/svelte-phaser/src/Tilemap.svelte
```
