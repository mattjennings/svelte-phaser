import { getContext } from 'svelte'

export function getContainer() {
  return getContext('phaser/container')
}
