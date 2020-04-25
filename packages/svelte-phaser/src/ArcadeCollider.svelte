<script>
  import { getContext, onMount, createEventDispatcher } from 'svelte'
  import { toArray, findGameObjectsByName } from './util'
  import { onSceneEvent } from './onSceneEvent'

  const dispatch = createEventDispatcher()
  const gameObject = getContext('phaser/game-object')

  // `with` is a reserved keyword
  let _with

  export let overlapOnly
  export { _with as with }

  const scene = getContext('phaser/scene')
  const collider = overlapOnly
    ? scene.physics.add.overlap(
        [gameObject],
        createObjectsArray(scene, _with),
        (self, other) => dispatch('collide', { self, other }),
        (self, other) => dispatch('process', { self, other })
      )
    : scene.physics.add.collider(
        [gameObject],
        createObjectsArray(scene, _with),
        (self, other) => dispatch('collide', { self, other }),
        (self, other) => dispatch('process', { self, other })
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
