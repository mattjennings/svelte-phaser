<script>
  import Phaser from '../phaser.js'
  import { getGameObject } from '../getGameObject'
  import { onGameEvent } from '../onGameEvent'
  import { shouldApplyProps } from '../util'

  /**
   * The Path this PathFollower is following. It can only follow one Path at a time.
   * @type {Phaser.Curves.Path}
   */
  export let path = undefined

  /**
   * Configuration for the p
   * @type {Phaser.Types.GameObjects.PathFollower}
   */
  export let pathConfig = undefined

  /**
   * Should the PathFollower automatically rotate to point in the direction of the Path?…
   * @type {boolean}
   */
  export let rotateToPath = false

  const instance = getGameObject()

  // not sure if this is safe? we somehow need to give the instance PathFollower capabilities
  Object.assign(instance, Phaser.GameObjects.Components.PathFollower)

  $: if (shouldApplyProps(path)) {
    if (path) {
      instance.setPath(path, pathConfig)
      instance.startFollow(pathConfig)
    } else {
      instance.stopFollow()
    }
  }

  $: shouldApplyProps(rotateToPath) && instance.setRotateToPath(rotateToPath)

  onGameEvent('prestep', () => {
    path = instance.path
    rotateToPath = instance.rotateToPath
  })
</script>
