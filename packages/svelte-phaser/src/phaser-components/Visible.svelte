<script>
  import { getGameObject } from '../getGameObject'
  import { onGameEvent } from '../onGameEvent'
  import { shouldApplyProps } from '../util'

  /**
   * Sets the visibility of this Game Object.
   *
   * An invisible Game Object will skip rendering, but will still process update logic.
   *
   * #phaserDefault true
   * @type {boolean}
   */
  export let visible = undefined

  const instance = getGameObject()

  $: shouldApplyProps(visible) && instance.setVisible(visible)

  onGameEvent('prestep', () => {
    visible = instance.visible
  })
</script>
