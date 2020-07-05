import { onMount } from 'svelte'
import { getGame } from './getGame'
import { getScene } from './getScene'

export function onGameEvent(event, callback) {
  const game = getGame()

  const scene = getScene()

  onMount(() => {
    const fn = (...args) => {
      if (!scene || !scene.scene || !scene.scene.isPaused(scene.scene.key)) {
        callback(...args)
      }
    }

    game.events.on(event, fn)

    return () => game.events.off(event, fn)
  })
}
