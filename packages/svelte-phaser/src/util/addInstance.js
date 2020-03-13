import getParentContainer from './getParentContainer'

/**
 * Adds an instance to the parent scene
 */
export function addInstance(self) {
  const parent = getParentContainer()

  if (parent) {
    parent.add.existing(self)
  } else {
    throw new Error('Unable to find Scene for instance')
  }
}
