import { getScene } from '../getScene'
import { getContainer } from '../getContainer'

/**
 * Adds an instance to the parent scene
 */
export function addInstance<
  T extends
    | Phaser.GameObjects.GameObject
    | Phaser.GameObjects.Group
    | Phaser.GameObjects.Container
>(self: T) {
  const scene = getScene()
  const container = getContainer()

  if (scene) {
    // @ts-ignore
    scene.add.existing(self)
  } else {
    throw new Error('Unable to find Scene for instance')
  }

  if (container && container !== self) {
    container.add(
      self as Phaser.GameObjects.GameObject | Phaser.GameObjects.Container
    )
  }
}
