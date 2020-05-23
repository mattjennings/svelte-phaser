<script>
  import Graphics from './Graphics.svelte'
  import { shouldApplyProps } from '../util'

  /**
   * The x coordinate
   *
   * #required
   * @type {number}
   */
  export let x

  /**
   * The y coordinate
   *
   * #required
   * @type {number}
   */
  export let y

  /**
   * The width
   *
   * #required
   * @type {number}
   */
  export let width

  /**
   * The height
   *
   * #required
   * @type {number}
   */
  export let height

  /**
   * The number of points to draw the ellipse with.
   * @type {number}
   */
  export let smoothness = 32

  /**
   * The default fill alpha for shapes rendered by this Graphics object.
   *
   * #phaserDefault 1
   * @type {number}
   */
  export let fillAlpha = undefined

  /**
   * The default fill color for shapes rendered by this Graphics object.
   *
   * The color should be a hex value. ex. red would be 0xff0000
   *
   * #phaserDefault -1
   * @type {number}
   */
  export let fillColor = undefined

  /**
   * The default stroke alpha for shapes rendered by this Graphics object.
   *
   * #phaserDefault 1
   * @type {number}
   */
  export let strokeAlpha = undefined

  /**
   * The default stroke color for shapes rendered by this Graphics object.
   *
   * The color should be a hex value. ex. red would be 0xff0000
   *
   * #phaserDefault -1
   * @type {number}
   */
  export let strokeColor = undefined

  /**
   * The default stroke width for shapes rendered by this Graphics object.
   *
   * #phaserDefault 1
   * @type {number}
   */
  export let strokeWidth = undefined

  export let instance = undefined

  $: if (instance && shouldApplyProps(fillColor, fillAlpha)) {
    instance.clear()
    instance.fillEllipse(x, y, width, height, smoothness)
  }

  $: if (instance && shouldApplyProps(strokeWidth, strokeAlpha, strokeColor)) {
    instance.clear()
    instance.strokeEllipse(x, y, width, height, smoothness)
  }
</script>

<Graphics
  bind:instance
  bind:x
  bind:y
  bind:fillColor
  bind:fillAlpha
  bind:strokeColor
  bind:strokeWidth
  bind:strokeAlpha
  {...$$restProps}>
  <slot />
</Graphics>
