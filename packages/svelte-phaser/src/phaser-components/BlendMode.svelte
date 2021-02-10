<script lang="ts">
  import { getGameObject } from '../getGameObject'
  import { onGameEvent } from '../onGameEvent'
  import { shouldApplyProps } from '../util'

  /**
   * Sets the Blend Mode being used by this Game Object.
   * This can be a const, such as Phaser.BlendModes.SCREEN, or an integer, such as 4 (for Overlay)
   * Under WebGL only the following Blend Modes are available:
   *
   *  ADD
   *
   *  MULTIPLY
   *
   *  SCREEN
   *
   *  ERASE
   *
   * Canvas has more available depending on browser support.
   * You can also create your own custom Blend Modes in WebGL.
   * Blend modes have different effects under Canvas and WebGL, and from browser to browser, depending on support.
   * Blend Modes also cause a WebGL batch flush should it encounter a new blend mode.
   * For these reasons try to be careful about the construction of your Scene and the frequency of which blend modes are used.
   * @type {Phaser.BlendModes | string}
   */
  export let blendMode: Phaser.BlendModes | string = undefined

  /**
   * Defaults to the parent game object in Svelte context. If you need to provide
   * the instance yourself, you can do so here.
   */
  export let gameObject = getGameObject<
    Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.BlendMode
  >()

  $: shouldApplyProps(blendMode) && gameObject.setBlendMode(blendMode)

  onGameEvent('prestep', () => {
    blendMode = gameObject.blendMode
  })
</script>
