<script>
  import { getGameObject } from '../getGameObject'
  import { onGameEvent } from '../onGameEvent'
  import { shouldApplyProps } from '../util'

  /**
   * The Mask this Game Object is using during render.
   * @type {Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask}
   */
  export let mask = undefined

  const instance = getGameObject()

  $: if (shouldApplyProps(mask)) {
    if (mask) {
      instance.setMask(mask)
    } else {
      instance.clearMask()
    }
  }

  onGameEvent('prestep', () => {
    mask = instance.mask
  })
</script>
