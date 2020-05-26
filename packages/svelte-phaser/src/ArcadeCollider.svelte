<script>
  import { getContext, onMount, createEventDispatcher } from 'svelte'
  import { toArray, findGameObjectsByName } from './util'
  import { onSceneEvent } from './onSceneEvent'
  import { getScene } from './getScene.js'

  const dispatch = createEventDispatcher()
  const parent =
    getContext('phaser/game-object') || getContext('phaser/tilemap-layer')

  // `with` is a reserved keyword
  let _with

  export let overlapOnly = undefined
  export let allowCollision = undefined

  export { _with as with }

  const scene = getScene()
  const collider = overlapOnly
    ? scene.physics.add.overlap(
        [parent],
        createObjectsArray(scene, _with),
        (self, other) => dispatch('collide', { self, other }),
        allowCollision
          ? (self, other) => allowCollision({ self, other })
          : undefined
      )
    : scene.physics.add.collider(
        [parent],
        createObjectsArray(scene, _with),
        (self, other) => dispatch('collide', { self, other }),
        allowCollision
          ? (self, other) => allowCollision({ self, other })
          : undefined
      )

  onMount(() => () => collider.destroy())

  // update gameobject references by string when a child is added to the scene
  onSceneEvent('CHILD_ADDED', object => {
    if (object.name) {
      const withStrings = toArray(_with).filter(obj => typeof obj === 'string')

      if (withStrings.includes(object.name)) {
        collider.object2 = [...collider.object2, object]
      }
    }
  })

  $: collider.object2 = createObjectsArray(scene, _with)
  $: collider.overlapOnly = overlapOnly

  function createObjectsArray(scene, objects) {
    return toArray(objects).reduce((total, object) => {
      if (typeof object === 'string') {
        return [...total, ...findGameObjectsByName(scene, object)]
      }

      return [...total, object]
    }, [])
  }
</script>
