import { getContext } from 'svelte'

/**
 * Adds an instance to the parent scene
 */
export function addInstance(self) {
  const scene = getContext('phaser/scene')

  if (parent) {
    scene.add.existing(self)
  } else {
    throw new Error('Unable to find Scene for instance')
  }
}
