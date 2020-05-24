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

  const instance = getGameObject()

  $: shouldApplyProps(crop) &&
    instance.setCrop(crop.x, crop.y, crop.width, crop.height)
</script>
