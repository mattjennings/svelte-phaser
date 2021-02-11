<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'
  import { toArray, findGameObjectsByName } from './util'
  import { onSceneEvent } from './onSceneEvent'
  import { getScene } from './getScene'
  import { getGameObject } from './getGameObject'
  import { getTilemap } from './getTilemap'

  const dispatch = createEventDispatcher()
  const parent =
    getGameObject() ||
    ((getTilemap() as unknown) as Phaser.GameObjects.GameObject)

  // `with` is a reserved keyword
  let _with

  export let overlapOnly: boolean = undefined
  export let allowCollision: <
    Self extends Phaser.GameObjects.GameObject,
    Other extends Phaser.GameObjects.GameObject
  >(args: {
    self: Self
    other: Other
  }) => boolean = undefined

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
  onSceneEvent('CHILD_ADDED', (object) => {
    if (object.name) {
      const withStrings = toArray(_with).filter(
        (obj) => typeof obj === 'string'
      )

      if (withStrings.includes(object.name)) {
        // @ts-ignore
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
