import { getScene } from '../getScene.js'
import { getContainer } from '../getContainer.js'

/**
 * Adds an instance to the parent scene
 */
export function addInstance(self) {
  const scene = getScene()
  const container = getContainer()

  if (scene) {
    scene.add.existing(self)
  } else {
    throw new Error('Unable to find Scene for instance')
  }

  if (container && container !== self) {
    container.add(self)
  }
}
