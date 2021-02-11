<script lang="ts">
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
  export let flipX: boolean = undefined

  /**
   * The vertically flipped state of the Game Object.
   * A Game Object that is flipped vertically will render inversed on the vertical axis (i.e. upside down).
   * Flipping always takes place from the middle of the texture and does not impact the scale value.
   * If this Game Object has a physics body, it will not change the body. This is a rendering toggle only.
   * @type {boolean}
   */
  export let flipY: boolean = undefined

  /**
   * Defaults to the parent game object in Svelte context. If you need to provide
   * the instance yourself, you can do so here.
   */
  export let gameObject = getGameObject<Phaser.GameObjects.Components.Flip>()

  $: shouldApplyProps(flipX) && gameObject.setFlipX(flipX)
  $: shouldApplyProps(flipY) && gameObject.setFlipY(flipY)

  onGameEvent('prestep', () => {
    flipX = gameObject.flipX
    flipY = gameObject.flipY
  })
</script>
