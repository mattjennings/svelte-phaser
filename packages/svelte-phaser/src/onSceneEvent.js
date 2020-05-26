import { getContext, onMount } from 'svelte'
import { getScene } from './getScene.js'

export function onSceneEvent(event, callback) {
  const scene = getScene()

  onMount(() => {
    scene.events.on(event, callback)

    return () => scene.events.off(event, callback)
  })
}
