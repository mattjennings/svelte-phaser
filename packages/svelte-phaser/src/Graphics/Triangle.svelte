<script>
  import Graphics from './Graphics.svelte'

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

  export let instance = undefined

  $: instance && instance.fillTriangle(x1, y1, x2, y2, x3, y3)
</script>

<Graphics bind:instance bind:x bind:y {...$$restProps} />
