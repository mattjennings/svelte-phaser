<script>
  import Graphics from './Graphics.svelte'

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

  export let instance = undefined

  $: instance && instance.fillEllipse(x, y, width, height, smoothness)
</script>

<Graphics bind:instance bind:x bind:y {...$$restProps} />
