<script>
  import { setContext, afterUpdate } from 'svelte'
  import { getGame } from './getGame'

  export let initial
  export let scenes

  const game = getGame()
  let stack = [sanitizeScene(initial)]

  let currentScene = stack[stack.length - 1]
  let previousScene
  let isTransitioning = false

  $: currentScene = stack[stack.length - 1]
  $: previousScene = stack[stack.length - 2]

  setContext('phaser/scene-router', {
    currentScene,
    previousScene,
    set: scene => {
      transition([...stack.slice(0, stack.length - 1), sanitizeScene(scene)])
    },
    pop: () => {
      previousScene.props.paused = false
      previousScene.props.visible = true

      transition([...stack.slice(0, stack.length - 1)])
    },
    push: (scene, config = {}) => {
      const { hidePrevious = true, pausePrevious = true } = config

      if (hidePrevious) {
        currentScene.props.visible = false
      }

      if (pausePrevious) {
        currentScene.props.paused = true
      }

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
    {...scene.props} />
{/each}
