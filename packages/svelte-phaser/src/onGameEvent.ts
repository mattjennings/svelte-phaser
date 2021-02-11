import { onMount } from 'svelte'
import { getGame } from './getGame'

export function onGameEvent(event: string, callback: Function) {
  const game = getGame()

  onMount(() => {
    game.events.on(event, callback)

    return () => game.events.off(event, callback)
  })
}
