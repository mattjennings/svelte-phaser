<script lang="ts">
  import { getGameObject } from '../getGameObject'
  import { onGameEvent } from '../onGameEvent'
  import { shouldApplyProps } from '../util'

  /**
   * The Mask this Game Object is using during render.
   * @type {Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask}
   */
  export let mask:
    | Phaser.Display.Masks.BitmapMask
    | Phaser.Display.Masks.GeometryMask = undefined

  /**
   * Defaults to the parent game object in Svelte context. If you need to provide
   * the instance yourself, you can do so here.
   */
  export let gameObject = getGameObject<
    Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.Mask
  >()

  $: if (shouldApplyProps(mask)) {
    if (mask) {
      gameObject.setMask(mask)
    } else {
      gameObject.clearMask()
    }
  }

  onGameEvent('prestep', () => {
    mask = gameObject.mask
  })
</script>
