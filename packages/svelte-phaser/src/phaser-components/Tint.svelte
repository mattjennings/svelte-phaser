<script>
  import { getGameObject } from '../getGameObject'
  import { onGameEvent } from '../onGameEvent'
  import { shouldApplyProps } from '../util'

  /**
   * The tint value being applied to the bottom-left of the Game Object. This value is interpolated from the corner to the center of the Game Object.
   * @type {number}
   */
  export let tintBottomLeft = undefined

  /**
   * The tint value being applied to the bottom-right of the Game Object. This value is interpolated from the corner to the center of the Game Object.
   * @type {number}
   */
  export let tintBottomRight = undefined

  /**
   * Fill or additive?
   *
   * #phaserDefault false
   * @type {boolean}
   */
  export let tintFill = undefined

  /**
   * The tint value being applied to the top-left of the Game Object. This value is interpolated from the corner to the center of the Game Object.
   * @type {number}
   */
  export let tintTopLeft = undefined

  /**
   * The tint value being applied to the top-right of the Game Object. This value is interpolated from the corner to the center of the Game Object.
   * @type {number}
   */
  export let tintTopRight = undefined

  const instance = getGameObject()

  $: if (
    shouldApplyProps(
      tintTopLeft,
      tintTopRight,
      tintBottomLeft,
      tintBottomRight,
      tintFill
    )
  ) {
    if (
      tintTopLeft !== instance.tintTopLeft ||
      tintTopRight !== instance.tintTopRight ||
      tintBottomLeft !== instance.tintBottomLeft ||
      tintBottomRight !== instance.tintBottomRight
    ) {
      instance.setTint(
        tintTopLeft,
        tintTopRight,
        tintBottomLeft,
        tintBottomRight,
        tintFill
      )
    }
  }

  onGameEvent('prestep', () => {
    tintBottomLeft = instance.tintBottomLeft
    tintBottomRight = instance.tintBottomRight
    tintTopLeft = instance.tintTopLeft
    tintTopRight = instance.tintTopRight
  })
</script>
