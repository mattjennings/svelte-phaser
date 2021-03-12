<script lang="ts">
  import { setContext, tick } from 'svelte'
  import { writable } from 'svelte/store'
  import type { RouterContext, SceneComponent } from './context'

  export let initial: SceneComponent

  let nextId = 0

  const router = writable<RouterContext>({
    scenes: [prepareScene(initial)],
    go: async (scene) => {
      let previous = $router.scenes[$router.scenes.length - 1]
      const [next, ...newScenes] = toArray(scene).map(prepareScene)
      const { transition } = next

      if (transition && previous) {
        updateScenes([previous, next, ...newScenes])

        await tick()
        previous = {
          ...previous,
          props: {
            ...(previous.props ?? {}),
            transition: {
              ...transition,
              target: next.key,
              onUpdate: function (progress) {
                debugger
                transition?.onUpdate(this, progress)
              },
            },
            onTransitionComplete: () => {
              updateScenes([next, ...newScenes])
            },
          },
        }
        updateScenes([previous, next, ...newScenes])
      } else {
        updateScenes([next, ...newScenes])
      }

      return newScenes.map((scene) => scene.key)
    },
    add: (scene) => {
      const newScenes = toArray(scene).map(prepareScene)

      updateScenes([...$router.scenes, ...newScenes])

      return newScenes.map((scene) => scene.key)
    },
    remove: (key) => {
      const keys = toArray(key)

      updateScenes(
        $router.scenes.filter((scene) => !keys.find((key) => key === scene.key))
      )
    },
  })

  function updateScenes(newScenes) {
    const asArray = Array.isArray(newScenes) ? newScenes : [newScenes]
    $router.scenes = asArray
  }

  function toArray<T>(value: T): T[] {
    return Array.isArray(value) ? value : [value]
  }

  function prepareScene(scene: SceneComponent): SceneComponent {
    return {
      key: `${scene.props?.name ?? 'scene'}-${++nextId}`,
      ...scene,
    }
  }

  setContext('router', router)
</script>

{#each $router.scenes as scene, index (index)}
  <svelte:component
    this={scene.component}
    key={scene.key}
    {...scene.props}
    on:transitioncomplete={scene.props?.onTransitionComplete}
  />
{/each}
