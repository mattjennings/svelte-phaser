import { onMount } from 'svelte'
import { getScene } from './getScene'

export function onSceneEvent(event: string, callback: Function) {
  const scene = getScene()

  onMount(() => {
    scene.events.on(event, callback)

    return () => scene.events.off(event, callback)
  })
}
