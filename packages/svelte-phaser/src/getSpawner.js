import { getContext } from 'svelte'

export function getSpawner() {
  return getContext('phaser/spawner')
}
