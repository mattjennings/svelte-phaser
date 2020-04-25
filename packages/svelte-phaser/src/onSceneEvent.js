import { getContext, onMount } from 'svelte'

export function onSceneEvent(event, callback) {
  const scene = getContext('phaser/scene')

  onMount(() => {
    scene.events.on(event, callback)

    return () => scene.events.off(event, callback)
  })
}
