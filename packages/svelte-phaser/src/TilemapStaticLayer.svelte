<script>
  import Phaser from 'phaser'
  import { setContext } from 'svelte'
  import { getScene } from './getScene'
  import { getTilemap } from './getTilemap'
  import { shouldApplyProps } from './util'

  export let id
  export let name
  export let tileset
  export let collisionTiles
  export let collisionTilesBetween
  export let collisionTilesByExclusion
  export let collisionTilesByProperty
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

  setContext('phaser/tilemap-layer', instance)

  $: shouldApplyProps(name) && instance.setName(name)
  $: shouldApplyProps(collisionTiles) &&
    instance.setCollisionTiles(collisionTiles)
  $: shouldApplyProps(collisionTilesBetween) &&
    instance.setCollisionBetween(
      collisionTilesBetween[0],
      collisionTilesBetween[1]
    )
  $: shouldApplyProps(collisionTilesByExclusion) &&
    instance.setCollisionByExclusion(collisionTilesByExclusion)
  $: shouldApplyProps(collisionTilesByProperty) &&
    instance.setCollisionByProperty(collisionTilesByProperty)
</script>

<slot />
