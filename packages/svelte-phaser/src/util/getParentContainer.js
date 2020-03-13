import { getContext } from 'svelte'

/**
 * @returns {Phaser.Scene}
 */
export default function getParentContainer() {
  return getContext('phaser/scene')
}
