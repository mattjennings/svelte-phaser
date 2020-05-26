import { getContext, onMount } from 'svelte'
import { getScene } from './getScene.js'

export function onInputEvent(event, callback) {
  const scene = getScene()

  onMount(() => {
    scene.input.on(event, callback)

    return () => scene.input.off(event, callback)
  })
}
