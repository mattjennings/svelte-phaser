import { getContext } from 'svelte'

export function getTilemap() {
  return getContext('phaser/tilemap')
}
