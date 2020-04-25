import { getContext, onMount } from 'svelte'

export function onInputEvent(event, callback) {
  const scene = getContext('phaser/scene')

  onMount(() => {
    scene.input.on(event, callback)

    return () => scene.input.off(event, callback)
  })
}
