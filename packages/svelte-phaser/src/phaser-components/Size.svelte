<script>
  import { getGameObject } from '../getGameObject'
  import { onGameEvent } from '../onGameEvent'
  import { shouldApplyProps } from '../util'

  /**
   * The displayed height of this Game Object.
   * This value takes into account the scale factor.
   * Setting this value will adjust the Game Object's scale property.
   * @type {number}
   */
  export let displayHeight = undefined

  /**
   * The displayed width of this Game Object.
   * This value takes into account the scale factor.
   * Setting this value will adjust the Game Object's scale property.
   *
   * @type {number}
   */
  export let displayWidth = undefined

  /**
   * The height of this Text object.
   * @type {number}
   */
  export let height = undefined

  /**
   * The width of this Text object.
   * @type {number}
   */
  export let width = undefined

  const instance = getGameObject()

  $: if (shouldApplyProps(displayHeight, displayWidth)) {
    instance.setDisplaySize(displayWidth, displayHeight)
  }

  $: if (shouldApplyProps(height, width)) {
    instance.setSize(width, height)
  }

  onGameEvent('prestep', () => {
    // may not be safe to bind? todo: test it
    // displayHeight = instance.displayHeight
    // displayWidth = instance.displayWidth

    height = instance.height
    width = instance.width
  })
</script>
