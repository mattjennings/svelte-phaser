<script>
  import Phaser from 'phaser'
  import { getScene } from './getScene'
  import { getTilemap } from './getTilemap'

  export let id
  export let tileset
  export let x = 0
  export let y = 0

  const scene = getScene()
  const tilemap = getTilemap() // as Phaser.Tilemaps.Tilemap

  let tilesets = tilemap.tilesets

  console.log(tilemap)
  export let instance = tilemap.createStaticLayer(
    id,
    tilesets.find(ts => ts.name === tileset),
    x,
    y
  )
</script>

<slot />
