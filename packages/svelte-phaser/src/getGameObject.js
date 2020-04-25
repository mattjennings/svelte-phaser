import { getContext } from 'svelte'

export function getGameObject() {
  return getContext('phaser/game-object')
}
