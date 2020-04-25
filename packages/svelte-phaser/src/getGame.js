import { getContext } from 'svelte'

export function getGame() {
  return getContext('phaser/game')
}
