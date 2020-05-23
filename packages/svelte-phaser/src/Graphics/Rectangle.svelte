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
   * Rounds the corners of the rectangle by this value in px
   * @type {number}
   */
  export let cornerRadius = 0

  /**
   * Whether the shape is filled or outline only
   *
   * @type {"fill" | "stroke"}
   */
  export let type = 'fill'

  export let instance = undefined

  $: if (instance) {
    instance.clear()
    type === 'fill'
      ? cornerRadius
        ? instance.fillRoundedRect(x, y, width, height, cornerRadius)
        : instance.fillRect(x, y, width, height)
      : cornerRadius
      ? instance.strokeRoundedRect(x, y, width, height, cornerRadius)
      : instance.strokeRect(x, y, width, height)
  }
</script>

<Graphics bind:instance bind:x bind:y {...$$restProps}>
  <slot />
</Graphics>
