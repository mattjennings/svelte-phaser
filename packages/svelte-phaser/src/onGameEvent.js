import { getContext, onMount } from 'svelte'

export function onGameEvent(event, callback) {
  const game = getContext('phaser/game')

  onMount(() => {
    game.events.on(event, callback)

    return () => game.events.off(event, callback)
  })
}
