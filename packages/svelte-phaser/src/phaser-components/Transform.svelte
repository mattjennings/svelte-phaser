<script>
  import { getGameObject } from '../getGameObject'
  import { onGameEvent } from '../onGameEvent'
  import { shouldApplyProps } from '../util'

  /**
   * The angle of this Game Object as expressed in degrees.
   * Phaser uses a right-hand clockwise rotation system, where 0 is right, 90 is down, 180/-180 is left and -90 is up.
   * If you prefer to work in radians, see the rotation property instead.
   * @type {number}
   */
  export let angle = undefined

  /**
   * The angle of this Game Object in radians. Phaser uses a right-hand clockwise rotation system, where 0 is right, 90 is down, 180/-180 is left and -90 is up.
   * If you prefer to work in degrees, see the angle property instead.
   * @type {number}
   */
  export let rotation = undefined

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
  export let scale = undefined

  /**
   * The horizontal scale of this Game Object.
   *
   * #phaserDefault 1
   * @type {number}
   */
  export let scaleX = undefined

  /**
   * The vertical scale of this Game Object.
   *
   * #phaserDefault 1
   * @type {number}
   */
  export let scaleY = undefined

  /**
   * The w position of this Game Object.
   * @type {number}
   */
  export let w = undefined

  /**
   * The x position of this Game Object.
   * @type {number}
   */
  export let x = undefined

  /**
   * The y position of this Game Object.
   * @type {number}
   */
  export let y = undefined

  /**
   * The z position of this Game Object.
   *
   * Note: The z position does not control the rendering order of 2D Game Objects. Use depth instead.
   * @type {number}
   */
  export let z = undefined

  const instance = getGameObject()

  $: shouldApplyProps(angle) && instance.setAngle(angle)

  $: if (shouldApplyProps(scale) && scale !== instance.scale) {
    instance.setScale(scale)
  } else if (
    shouldApplyProps(scaleX, scaleY) &&
    (scaleX !== instance.scaleX || scaleY !== instance.scaleY)
  ) {
    instance.setScale(scaleX, scaleY)
  }

  $: shouldApplyProps(rotation) && instance.setRotation(rotation)

  $: shouldApplyProps(w) && instance.setW(w)
  $: shouldApplyProps(x) && instance.setX(x)
  $: shouldApplyProps(y) && instance.setY(y)
  $: shouldApplyProps(z) && instance.setZ(z)

  onGameEvent('prestep', () => {
    angle = instance.angle
    rotation = instance.rotation
    scale = instance.scale
    scaleX = instance.scaleX
    scaleY = instance.scaleY
  })

  // position values will conflict with velocity if they're
  // in the prestep event. it seems fine in prerender...
  onGameEvent('prerender', () => {
    w = instance.w
    x = instance.x
    y = instance.y
    z = instance.z
  })
</script>
