<script lang="ts">
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
  export let visible: boolean = undefined

  /**
   * Defaults to the parent game object in Svelte context. If you need to provide
   * the instance yourself, you can do so here.
   */
  export let gameObject = getGameObject<
    Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.Visible
  >()

  $: shouldApplyProps(visible) && gameObject.setVisible(visible)

  onGameEvent('prestep', () => {
    visible = gameObject.visible
  })
</script>
