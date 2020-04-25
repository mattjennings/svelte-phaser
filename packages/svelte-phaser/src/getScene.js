import { getContext } from 'svelte'

export function getScene() {
  return getContext('phaser/scene')
}
