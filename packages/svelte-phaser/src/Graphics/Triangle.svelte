<script>
  import Graphics from './Graphics.svelte'
  import { shouldApplyProps } from '../util'

  /**
   * The x coordinate of the whole triangle
   *
   * #required
   * @type {number}
   */
  export let x

  /**
   * The y coordinate of the whole triangle
   *
   * #required
   * @type {number}
   */
  export let y

  /**
   * The x coordinate of the first point
   *
   * #required
   * @type {number}
   */
  export let x1

  /**
   * The y coordinate of the first point
   *
   * #required
   * @type {number}
   */
  export let y1

  /**
   * The x coordinate of the second point
   *
   * #required
   * @type {number}
   */
  export let x2

  /**
   * The y coordinate of the second point
   *
   * #required
   * @type {number}
   */
  export let y2

  /**
   * The x coordinate of the third point
   *
   * #required
   * @type {number}
   */
  export let x3

  /**
   * The y coordinate of the third point
   *
   * #required
   * @type {number}
   */
  export let y3

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
    instance.fillTriangle(x1, y1, x2, y2, x3, y3)
  }

  $: if (instance && shouldApplyProps(strokeWidth, strokeAlpha, strokeColor)) {
    instance.clear()
    instance.strokeTriangle(x1, y1, x2, y2, x3, y3)
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
