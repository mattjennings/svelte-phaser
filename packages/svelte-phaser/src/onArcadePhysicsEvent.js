import { onMount } from 'svelte'
import { getScene } from './getScene'

export function onArcadePhysicsEvent(event, callback) {
  const scene = getScene()

  onMount(() => {
    scene.physics.world.on(event, callback)

    return () => scene.physics.world.off(event, callback)
  })
}
