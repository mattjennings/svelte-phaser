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
   * The radius in px
   *
   * #required
   * @type {number}
   */
  export let radius

  export let instance = undefined

  $: instance && instance.fillCircle(x, y, radius)
</script>

<Graphics bind:instance bind:x bind:y {...$$restProps} />
