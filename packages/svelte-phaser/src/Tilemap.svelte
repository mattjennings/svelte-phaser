<script>
  import { onMount, setContext } from 'svelte'
  import { getScene } from './getScene'

  /**
   * The key of the tilemap asset. This should be preloaded in the Scene's preload.
   *
   * See: https://photonstorm.github.io/phaser3-docs/Phaser.Loader.LoaderPlugin.html#tilemapTiledJSON__anchor
   *
   * @type {string}
   */
  export let key

  export let tilesets = []

  /**
   * Renders the child TilemapLayer's in order of the layers in the tilemap
   * @type {boolean}
   */
  export let useLayerOrder = true

  /**
   * If useLayerOrder is true, the layer depths will start at this number and increment
   * by 1
   * @type {number}
   */
  export let startingDepth = 0

  const scene = getScene()

  export let instance = scene.make.tilemap({ key })

  const tilemapData = scene.cache.tilemap.get(key)

  const layerOrder = tilemapData.data.layers.map(layer => layer.name)

  setContext('phaser/tilemap', instance)
  onMount(() => () => {
    instance.destroy()
  })

  tilesets.forEach(({ name, key }) => instance.addTilesetImage(name, key))
  instance.layerOrder = layerOrder
  instance.useLayerOrder = useLayerOrder
  instance.startingDepth = startingDepth
</script>

<slot />
