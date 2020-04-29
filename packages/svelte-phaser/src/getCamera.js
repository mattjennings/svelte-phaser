import { getContext } from 'svelte'

export function getCamera() {
  return getContext('phaser/camera')
}
