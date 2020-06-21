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
  export let depth

  const spawner = getSpawner()

  if (!spawner) {
    throw new Error('ObjectLayer must be inside of a <Spawner /> component')
  }

  const tilemap = getTilemap()

  const layer = tilemap.objects.find(layer => layer.name === id)

  if (tilemap.useLayerOrder && typeof depth === 'undefined') {
    depth =
      tilemap.layerOrder.findIndex(layerName => layerName === id) +
      tilemap.startingDepth
  }

  onMount(() => {
    if (!layer) {
      throw new Error(`Unable to find layer of id "${id}"`)
    }

    layer.objects.forEach(({ x, y, properties }) => {
      const { component, ...props } = properties.reduce(
        (total, prop) => ({ ...total, [prop.name]: prop.value }),
        {}
      )
      if (component && components[component]) {
        // allow component map to include components imported via `import * as Component from 'Component.svelte'`
        // by checking for .default
        const c = components[component].default || components[component]
        spawner.spawn(c, {
          x,
          y,
          depth,
          ...props,
        })
      }
    })
  })
</script>

<slot />
