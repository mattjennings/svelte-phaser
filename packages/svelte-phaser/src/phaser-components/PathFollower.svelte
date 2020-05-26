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

  /**
   * Defaults to the parent game object in Svelte context. If you need to provide
   * the instance yourself, you can do so here.
   */
  export let gameObject = getGameObject()

  // not sure if this is safe? we somehow need to give the instance PathFollower capabilities
  Object.assign(gameObject, Phaser.GameObjects.Components.PathFollower)

  $: if (shouldApplyProps(path)) {
    if (path) {
      gameObject.setPath(path, pathConfig)
      gameObject.startFollow(pathConfig)
    } else {
      gameObject.stopFollow()
    }
  }

  $: shouldApplyProps(rotateToPath) && gameObject.setRotateToPath(rotateToPath)

  onGameEvent('prestep', () => {
    path = gameObject.path
    rotateToPath = gameObject.rotateToPath
  })
</script>
