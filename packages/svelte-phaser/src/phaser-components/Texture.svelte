<script>
  import { getGameObject } from '../getGameObject'
  import { onGameEvent } from '../onGameEvent'
  import { shouldApplyProps } from '../util'

  /**
   * The Texture this Game Object is using to render with. It is not required if you are
   * assigning an `animation`.
   * @type {string}
   */
  export let texture = undefined

  /**
   * The Texture Frame this Game Object is using to render with.
   * @type {Phaser.Textures.Frame}
   */
  export let frame = undefined

  /**
   * Defaults to the parent game object in Svelte context. If you need to provide
   * the instance yourself, you can do so here.
   */
  export let gameObject = getGameObject()

  $: if (shouldApplyProps(texture, frame)) {
    gameObject.setTexture(texture, frame)
  }

  onGameEvent('prestep', () => {
    if (gameObject.texture && gameObject.texture.key) {
      texture = gameObject.texture.key
    }

    if (gameObject.frame) {
      frame = gameObject.frame.name
    }
  })
</script>
