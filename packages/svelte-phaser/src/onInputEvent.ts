import { onMount } from 'svelte'
import { getScene } from './getScene.js'

export function onInputEvent(event: string, callback: Function) {
  const scene = getScene()

  onMount(() => {
    scene.input.on(event, callback)

    return () => scene.input.off(event, callback)
  })
}
