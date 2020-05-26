import { getScene } from '../getScene.js'

/**
 * Adds an instance to the parent scene
 */
export function addInstance(self) {
  const scene = getScene()

  if (parent) {
    scene.add.existing(self)
  } else {
    throw new Error('Unable to find Scene for instance')
  }
}
