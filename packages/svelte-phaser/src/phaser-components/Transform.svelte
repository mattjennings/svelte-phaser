<script lang="ts">
  import { getGameObject } from '../getGameObject'
  import { onGameEvent } from '../onGameEvent'
  import { shouldApplyProps } from '../util'

  /**
   * The angle of this Game Object as expressed in degrees.
   * Phaser uses a right-hand clockwise rotation system, where 0 is right, 90 is down, 180/-180 is left and -90 is up.
   * If you prefer to work in radians, see the rotation property instead.
   * @type {number}
   */
  export let angle: number = undefined

  /**
   * The angle of this Game Object in radians. Phaser uses a right-hand clockwise rotation system, where 0 is right, 90 is down, 180/-180 is left and -90 is up.
   * If you prefer to work in degrees, see the angle property instead.
   * @type {number}
   */
  export let rotation: number = undefined

  /**
   * This is a special setter that allows you to set both the horizontal and vertical scale of this Game Object to the same value, at the same time.
   * When reading this value the result returned is (scaleX + scaleY) / 2.
   *
   * Use of this property implies you wish the horizontal and vertical scales to be equal to each other.
   * If this isn't the case, use the scaleX or scaleY properties instead.
   *
   * #phaserDefault 1
   * @type {number}
   */
  export let scale: number = undefined

  /**
   * The horizontal scale of this Game Object.
   *
   * #phaserDefault 1
   * @type {number}
   */
  export let scaleX: number = undefined

  /**
   * The vertical scale of this Game Object.
   *
   * #phaserDefault 1
   * @type {number}
   */
  export let scaleY: number = undefined

  /**
   * The w position of this Game Object.
   * @type {number}
   */
  export let w: number = undefined

  /**
   * The x position of this Game Object.
   * @type {number}
   */
  export let x: number = undefined

  /**
   * The y position of this Game Object.
   * @type {number}
   */
  export let y: number = undefined

  /**
   * The z position of this Game Object.
   *
   * Note: The z position does not control the rendering order of 2D Game Objects. Use depth instead.
   * @type {number}
   */
  export let z: number = undefined

  /**
   * Defaults to the parent game object in Svelte context. If you need to provide
   * the instance yourself, you can do so here.
   */
  export let gameObject = getGameObject<
    Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.Transform
  >()

  $: shouldApplyProps(angle) && gameObject.setAngle(angle)

  $: if (shouldApplyProps(scale) && scale !== gameObject.scale) {
    gameObject.setScale(scale)
  } else if (
    shouldApplyProps(scaleX, scaleY) &&
    (scaleX !== gameObject.scaleX || scaleY !== gameObject.scaleY)
  ) {
    gameObject.setScale(scaleX, scaleY)
  }

  $: shouldApplyProps(rotation) && gameObject.setRotation(rotation)

  $: shouldApplyProps(w) && gameObject.setW(w)
  $: shouldApplyProps(x) && gameObject.setX(x)
  $: shouldApplyProps(y) && gameObject.setY(y)
  $: shouldApplyProps(z) && gameObject.setZ(z)

  onGameEvent('prestep', () => {
    angle = gameObject.angle
    rotation = gameObject.rotation
    scale = gameObject.scale
    scaleX = gameObject.scaleX
    scaleY = gameObject.scaleY
  })

  // position values will conflict with velocity if they're
  // in the prestep event. it seems fine in prerender...
  onGameEvent('prerender', () => {
    w = gameObject.w
    x = gameObject.x
    y = gameObject.y
    z = gameObject.z
  })
</script>
