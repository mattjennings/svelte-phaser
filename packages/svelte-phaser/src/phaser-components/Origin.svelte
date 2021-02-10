<script lang="ts">
  import { getGameObject } from '../getGameObject'
  import { onGameEvent } from '../onGameEvent'
  import { shouldApplyProps } from '../util'

  /**
   * The horizontal display origin of this Game Object. The origin is a normalized value between 0 and 1.
   * The displayOrigin is a pixel value, based on the size of the Game Object combined with the origin.
   * @type {number}
   */
  export let displayOriginX: number = undefined

  /**
   * The vertical display origin of this Game Object. The origin is a normalized value between 0 and 1.
   * The displayOrigin is a pixel value, based on the size of the Game Object combined with the origin.
   * @type {number}
   */
  export let displayOriginY: number = undefined

  /**
   * The horizontal origin of this Game Object.
   * The origin maps the relationship between the size and position of the Game Object.
   * The default value is 0.5, meaning all Game Objects are positioned based on their center.
   * Setting the value to 0 means the position now relates to the left of the Game Object.
   *
   * #phaserDefault 0.5
   * @type {number}
   */
  export let originX: number = undefined

  /**
   * The vertical origin of this Game Object. The origin maps the relationship between the size and position of the Game Object.
   * The default value is 0.5, meaning all Game Objects are positioned based on their center.
   * Setting the value to 0 means the position now relates to the top of the Game Object.
   *
   * #phaserDefault 0.5
   * @type {number}
   */
  export let originY: number = undefined

  /**
   * Defaults to the parent game object in Svelte context. If you need to provide
   * the instance yourself, you can do so here.
   */
  export let gameObject = getGameObject<
    Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.Origin
  >()

  $: if (shouldApplyProps(displayOriginX, displayOriginY)) {
    gameObject.setDisplayOrigin(displayOriginX, displayOriginY)
  }

  $: if (shouldApplyProps(originX, originY)) {
    gameObject.setOrigin(originX, originY)
  }

  onGameEvent('prestep', () => {
    originX = gameObject.originX
    originY = gameObject.originY
    displayOriginX = gameObject.displayOriginX
    displayOriginY = gameObject.displayOriginY
  })
</script>
