<script>
  import { setContext, afterUpdate } from 'svelte'

  export let initial
  export let scenes

  let stack = [sanitizeScene(initial)]
  let currentScene = stack[stack.length - 1]
  let previousScene

  $: currentScene = stack[stack.length - 1]
  $: previousScene = stack[stack.length - 2]

  setContext('router', {
    currentScene,
    previousScene,
    set: (scene) => {
      transition([...stack.slice(0, stack.length - 1), sanitizeScene(scene)])
    },
    pop: () => {
      transition([...stack.slice(0, stack.length - 1)])
    },
    push: (scene, config = {}) => {
      transition([
        ...(stack.length > 1 ? stack.slice(0, stack.length - 2) : []),
        currentScene,
        sanitizeScene(scene),
      ])
    },
  })

  function transition(newStack) {
    stack = newStack
  }

  function sanitizeScene(scene) {
    if (typeof scene === 'string') {
      return {
        name: scene,
        props: {},
      }
    }
    return scene
  }
</script>

{#each stack as scene, index (index)}
  <svelte:component
    this={scenes[scene.name]}
    key={`${scene.name}-${index}`}
    {...scene.props}
  />
{/each}
