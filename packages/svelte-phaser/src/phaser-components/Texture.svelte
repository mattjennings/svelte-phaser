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

  const instance = getGameObject()

  $: if (shouldApplyProps(texture, frame)) {
    instance.setTexture(texture, frame)
  }

  onGameEvent('prestep', () => {
    if (instance.texture) {
      texture = instance.texture.key
    }

    if (instance.frame) {
      frame = instance.frame.name
    }
  })
</script>
