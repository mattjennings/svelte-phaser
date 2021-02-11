<script lang="ts">
  import { getGameObject } from '../getGameObject'
  import { onGameEvent } from '../onGameEvent'
  import { shouldApplyProps } from '../util'

  /**
   * The displayed height of this Game Object.
   * This value takes into account the scale factor.
   * Setting this value will adjust the Game Object's scale property.
   * @type {number}
   */
  export let displayHeight: number = undefined

  /**
   * The displayed width of this Game Object.
   * This value takes into account the scale factor.
   * Setting this value will adjust the Game Object's scale property.
   *
   * @type {number}
   */
  export let displayWidth: number = undefined

  /**
   * The height of this Text object.
   * @type {number}
   */
  export let height: number = undefined

  /**
   * The width of this Text object.
   * @type {number}
   */
  export let width: number = undefined

  /**
   * Defaults to the parent game object in Svelte context. If you need to provide
   * the instance yourself, you can do so here.
   */
  export let gameObject = getGameObject<Phaser.GameObjects.Components.Size>()

  $: if (shouldApplyProps(displayHeight, displayWidth)) {
    gameObject.setDisplaySize(displayWidth, displayHeight)
  }

  $: if (shouldApplyProps(height, width)) {
    gameObject.setSize(width, height)
  }

  onGameEvent('prestep', () => {
    // may not be safe to bind? todo: test it
    // displayHeight = gameObject.displayHeight
    // displayWidth = gameObject.displayWidth

    height = gameObject.height
    width = gameObject.width
  })
</script>
