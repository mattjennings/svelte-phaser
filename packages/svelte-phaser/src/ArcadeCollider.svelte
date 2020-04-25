<script>
  import { getContext, onMount, createEventDispatcher } from 'svelte'
  import { toArray, findGameObjectsByName } from './util'

  const dispatch = createEventDispatcher()
  const gameObject = getContext('phaser/game-object')

  // `with` is a reserved keyword
  let _with
  export { _with as with }

  const scene = getContext('phaser/scene')
  const collider = scene.physics.add.collider(
    [gameObject],
    createObjectsArray(scene, _with),
    (self, other) => dispatch('collide', { self, other }),
    (self, other) => dispatch('process', { self, other })
  )

  onMount(() => () => collider.destroy())

  $: {
    collider.object2 = createObjectsArray(scene, _with)
  }

  function createObjectsArray(scene, objects) {
    return toArray(objects).reduce((total, object) => {
      if (typeof object === 'string') {
        return [...total, ...findGameObjectsByName(scene, object)]
      }

      return [...total, object]
    }, [])
  }
</script>
