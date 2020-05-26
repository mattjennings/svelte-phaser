<script>
  import { getGameObject } from '../getGameObject'
  import { shouldApplyProps } from '../util'

  /**
   * Applies a crop to a texture based Game Object, such as a Sprite or Image.
   *
   * The object should contain x, y, width and height values.
   * @type {object}
   */
  export let crop = undefined

  /**
   * Defaults to the parent game object in Svelte context. If you need to provide
   * the instance yourself, you can do so here.
   */
  export let gameObject = getGameObject()

  $: shouldApplyProps(crop) &&
    gameObject.setCrop(crop.x, crop.y, crop.width, crop.height)
</script>
