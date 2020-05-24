<script>
  import { getGameObject } from '../getGameObject'
  import { onGameEvent } from '../onGameEvent'
  import { shouldApplyProps } from '../util'

  /**
   * The alpha value of the Game Object. This is a global value,
   * impacting the entire Game Object, not just a region of it.
   * @type {number}
   */
  export let alpha = undefined

  /**
   * The alpha value starting from the bottom-left of the Game Object.
   * This value is interpolated from the corner to the center of the Game Object.
   * @type {number}
   */
  export let alphaBottomLeft = undefined

  /**
   * The alpha value starting from the bottom-right of the Game Object.
   * This value is interpolated from the corner to the center of the Game Object.
   * @type {string}
   */
  export let alphaBottomRight = undefined

  /**
   * The alpha value starting from the top-left of the Game Object.
   * This value is interpolated from the corner to the center of the Game Object.
   * @type {string}
   */
  export let alphaTopLeft = undefined

  /**
   * The alpha value starting from the top-right of the Game Object.
   * This value is interpolated from the corner to the center of the Game Object.
   * @type {number}
   */
  export let alphaTopRight = undefined

  const instance = getGameObject()

  $: if (shouldApplyProps(alpha) && alpha !== instance.alpha) {
    instance.setAlpha(alpha)
  } else if (
    shouldApplyProps(
      alphaTopLeft,
      alphaTopRight,
      alphaBottomLeft,
      alphaBottomRight
    )
  ) {
    if (
      alphaTopLeft !== instance.alphaTopLeft ||
      alphaTopRight !== instance.alphaTopRight ||
      alphaBottomLeft !== instance.alphaBottomLeft ||
      alphaBottomRight !== instance.alphaBottomRight
    ) {
      instance.setAlpha(
        alphaTopLeft,
        alphaTopRight,
        alphaBottomLeft,
        alphaBottomRight
      )
    }
  }

  onGameEvent('step', () => {
    alpha = instance.alpha
    alphaBottomLeft = instance.alphaBottomLeft
    alphaBottomRight = instance.alphaBottomRight
    alphaTopLeft = instance.alphaTopLeft
    alphaTopRight = instance.alphaTopRight
  })
</script>
