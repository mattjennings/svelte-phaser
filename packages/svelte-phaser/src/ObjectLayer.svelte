<script>
  import { onMount } from 'svelte'
  import { getTilemap } from './getTilemap'
  import { getSpawner } from './getSpawner'

  /**
   * The mapping for components that this layer will render
   *
   * #required
   * @type {object}
   */
  export let components

  /**
   * The layer array index value, or the layer name from Tiled
   *
   * #required
   * @type {number|string}
   */
  export let id

  /**
   * The depth for each component in this layer
   * @type {number}
   */
  export let depth = 0

  const spawner = getSpawner()

  if (!spawner) {
    // todo: warn about no spawner
  }

  const tilemap = getTilemap()

  const layer = tilemap.objects.find(layer => layer.name === id)

  if (tilemap.useLayerOrder && typeof depth === 'undefined') {
    depth =
      tilemap.layerOrder.findIndex(layerName => layerName === id) +
      tilemap.startingDepth
  }

  onMount(() => {
    layer.objects.forEach(({ x, y, properties }) => {
      const { component, ...props } = properties.reduce(
        (total, prop) => ({ ...total, [prop.name]: prop.value }),
        {}
      )
      if (component && components[component]) {
        spawner.spawn(components[component], {
          x,
          y,
          ...props,
        })
      }
    })
  })
</script>

<slot />
