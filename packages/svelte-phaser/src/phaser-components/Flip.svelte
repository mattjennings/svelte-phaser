<script>
  import { getGameObject } from '../getGameObject'
  import { onGameEvent } from '../onGameEvent'
  import { shouldApplyProps } from '../util'

  /**
   * The horizontally flipped state of the Game Object.
   * A Game Object that is flipped horizontally will render inversed on the horizontal axis.
   * Flipping always takes place from the middle of the texture and does not impact the scale value.
   * If this Game Object has a physics body, it will not change the body. This is a rendering toggle only.
   * @type {boolean}
   */
  export let flipX = undefined

  /**
   * The vertically flipped state of the Game Object.
   * A Game Object that is flipped vertically will render inversed on the vertical axis (i.e. upside down).
   * Flipping always takes place from the middle of the texture and does not impact the scale value.
   * If this Game Object has a physics body, it will not change the body. This is a rendering toggle only.
   * @type {boolean}
   */
  export let flipY = undefined

  const instance = getGameObject()

  $: shouldApplyProps(flipX) && instance.setFlipX(flipX)
  $: shouldApplyProps(flipY) && instance.setFlipY(flipY)

  onGameEvent('prestep', () => {
    flipX = instance.flipX
    flipY = instance.flipY
  })
</script>
