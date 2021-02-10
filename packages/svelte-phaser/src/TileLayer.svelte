<svelte:options immutable />

<script lang="ts">
  import { setContext } from 'svelte'
  import { getTilemap } from './getTilemap'
  import { shouldApplyProps } from './util'
  import { onGameEvent } from './onGameEvent'

  import GameObject from './GameObject.svelte'
  import Alpha from './phaser-components/Alpha.svelte'
  import BlendMode from './phaser-components/BlendMode.svelte'
  import Depth from './phaser-components/Depth.svelte'
  import Flip from './phaser-components/Flip.svelte'
  import Origin from './phaser-components/Origin.svelte'
  import Pipeline from './phaser-components/Pipeline.svelte'
  import ScrollFactor from './phaser-components/ScrollFactor.svelte'
  import Size from './phaser-components/Size.svelte'
  import Transform from './phaser-components/Transform.svelte'
  import Visible from './phaser-components/Visible.svelte'

  /**
   * The alpha value of the Game Object. This is a global value,
   * impacting the entire Game Object, not just a region of it.
   * @type {number}
   */
  export let alpha: number = undefined

  /**
   * The alpha value starting from the bottom-left of the Game Object.
   * This value is interpolated from the corner to the center of the Game Object.
   * @type {number}
   */
  export let alphaBottomLeft: number = undefined

  /**
   * The alpha value starting from the bottom-right of the Game Object.
   * This value is interpolated from the corner to the center of the Game Object.
   * @type {string}
   */
  export let alphaBottomRight: number = undefined

  /**
   * The alpha value starting from the top-left of the Game Object.
   * This value is interpolated from the corner to the center of the Game Object.
   * @type {string}
   */
  export let alphaTopLeft: number = undefined

  /**
   * The alpha value starting from the top-right of the Game Object.
   * This value is interpolated from the corner to the center of the Game Object.
   * @type {number}
   */
  export let alphaTopRight: number = undefined

  /**
   * The angle of this Game Object as expressed in degrees.
   * Phaser uses a right-hand clockwise rotation system, where 0 is right, 90 is down, 180/-180 is left and -90 is up.
   * If you prefer to work in radians, see the rotation property instead.
   * @type {number}
   */
  export let angle = undefined

  /**
   * Sets the Blend Mode being used by this Game Object.
   * This can be a const, such as Phaser.BlendModes.SCREEN, or an integer, such as 4 (for Overlay)
   * Under WebGL only the following Blend Modes are available:
   *
   *  ADD
   *
   *  MULTIPLY
   *
   *  SCREEN
   *
   *  ERASE
   *
   * Canvas has more available depending on browser support.
   * You can also create your own custom Blend Modes in WebGL.
   * Blend modes have different effects under Canvas and WebGL, and from browser to browser, depending on support.
   * Blend Modes also cause a WebGL batch flush should it encounter a new blend mode.
   * For these reasons try to be careful about the construction of your Scene and the frequency of which blend modes are used.
   * @type {Phaser.BlendModes | string}
   */
  export let blendMode: Phaser.BlendModes | string = undefined

  /**
   * Sets collision on the given tile or tiles within a layer by index.
   * @type {number | number[]}
   */
  export let collisionTiles = undefined

  /**
   * Sets collision on a range of tiles in a layer whose index is between the specified start and stop (inclusive).
   * Calling this with a start value of 10 and a stop value of 14 would set collision for tiles 10, 11, 12, 13 and 14.
   * @type {[number, number]}
   */
  export let collisionTilesBetween = undefined

  /**
   * Sets collision on all tiles in the given layer, except for tiles that have an index specified in the given array.
   * @type {[number, number]}
   */
  export let collisionTilesByExclusion = undefined

  /**
   * Sets collision on the tiles within a layer by checking tile properties.
   * If a tile has a property that matches the given properties object,
   * its collision flag will be set.
   *
   * Providing an object with a key of "collides" and a value of `true` would check
   * for any tile with a "collides" property that equals `true`. You can also pass in
   * an array for the property value, and it will check if the tile property value is any of those.
   *
   * @type {object}
   */
  export let collisionTilesByProperty = undefined

  /**
   * Canvas only.
   *
   * The amount of extra tiles to add into the cull rectangle when calculating its horizontal size.
   * @type {number}
   */
  export let cullPaddingX = undefined

  /**
   * Canvas only.
   *
   * The amount of extra tiles to add into the cull rectangle when calculating its vertical size.
   * @type {number}
   */
  export let cullPaddingY = undefined

  /**
   * The depth of this Game Object within the Scene.
   * The depth is also known as the 'z-index' in some environments, and allows you to change the rendering order of Game Objects, without actually moving their position in the display list.
   * The depth starts from zero (the default value) and increases from that point. A Game Object with a higher depth value will always render in front of one with a lower value.
   * Setting the depth will queue a depth sort event within the Scene.
   * @type {number}
   */
  export let depth: number = undefined

  /**
   * The displayed height of this Game Object.
   * This value takes into account the scale factor.
   * Setting this value will adjust the Game Object's scale property.
   * @type {number}
   */
  export let displayHeight = undefined

  /**
   * The horizontal display origin of this Game Object. The origin is a normalized value between 0 and 1.
   * The displayOrigin is a pixel value, based on the size of the Game Object combined with the origin.
   * @type {number}
   */
  export let displayOriginX: number = undefined

  /**
   * The vertical display origin of this Game Object. The origin is a normalized value between 0 and 1.
   * The displayOrigin is a pixel value, based on the size of the Game Object combined with the origin.
   * @type {number}
   */
  export let displayOriginY: number = undefined

  /**
   * The displayed width of this Game Object.
   * This value takes into account the scale factor.
   * Setting this value will adjust the Game Object's scale property.
   * @type {number}
   */
  export let displayWidth = undefined

  /**
   * The horizontally flipped state of the Game Object.
   * A Game Object that is flipped horizontally will render inversed on the horizontal axis.
   * Flipping always takes place from the middle of the texture and does not impact the scale value.
   * If this Game Object has a physics body, it will not change the body. This is a rendering toggle only.
   *
   * #phaserDefault false
   * @type {boolean}
   */
  export let flipX: boolean = undefined

  /**
   * The vertically flipped state of the Game Object.
   * A Game Object that is flipped vertically will render inversed on the vertical axis (i.e. upside down).
   * Flipping always takes place from the middle of the texture and does not impact the scale value.
   * If this Game Object has a physics body, it will not change the body. This is a rendering toggle only.
   *
   * #phaserDefault false
   * @type {boolean}
   */
  export let flipY: boolean = undefined

  /**
   * The native (un-scaled) height of this Game Object.
   *
   * Changing this value will not change the size that the Game Object is rendered in-game.
   * For that you need to either set the scale or the displayHeight.
   * @type {number}
   */
  export let height = undefined

  /**
   * The layer array index value, or the layer name from Tiled
   *
   * #required
   * @type {number|string}
   */
  export let id

  /**
   * The name of this Game Object. ArcadeCollider will make use of names to find the reference to the Game Object.
   *
   * Note: this is not the same as `id`. `id` must be the name of the layer in the tilemap, but
   * the `name` prop can be anything you wish.
   *
   * @type {string}
   */
  export let name = undefined

  /**
   * The horizontal origin of this Game Object.
   * The origin maps the relationship between the size and position of the Game Object.
   * The default value is 0.5, meaning all Game Objects are positioned based on their center.
   * Setting the value to 0 means the position now relates to the left of the Game Object.
   *
   * #phaserDefault 0.5
   * @type {number}
   */
  export let originX: number = undefined

  /**
   * The vertical origin of this Game Object. The origin maps the relationship between the size and position of the Game Object.
   * The default value is 0.5, meaning all Game Objects are positioned based on their center.
   * Setting the value to 0 means the position now relates to the top of the Game Object.
   *
   * #phaserDefault 0.5
   * @type {number}
   */
  export let originY: number = undefined

  /**
   * The flags that are compared against RENDER_MASK to determine if this Game Object will render or not.
   * The bits are 0001 | 0010 | 0100 | 1000 set by the components Visible, Alpha, Transform and Texture respectively.
   * If those components are not used by your custom class then you can use this bitmask as you wish.
   *
   * #phaserDefault 15
   * @type {number}
   */
  export let renderFlags = undefined

  /**
   * This is a special setter that allows you to set both the horizontal and vertical scale of this Game Object to the same value, at the same time.
   * When reading this value the result returned is (scaleX + scaleY) / 2.
   *
   * Use of this property implies you wish the horizontal and vertical scales to be equal to each other.
   * If this isn't the case, use the scaleX or scaleY properties instead.
   *
   * #phaserDefault 1
   * @type {number}
   */
  export let scale = undefined

  /**
   * The horizontal scale of this Game Object.
   *
   * #phaserDefault 1
   * @type {number}
   */
  export let scaleX = undefined

  /**
   * The vertical scale of this Game Object.
   *
   * #phaserDefault 1
   * @type {number}
   */
  export let scaleY = undefined

  /**
   * The horizontal scroll factor of this Game Object.
   *
   * The scroll factor controls the influence of the movement of a Camera upon this Game Object.
   *
   * When a camera scrolls it will change the location at which this Game Object is rendered on-screen. It does not change the Game Objects actual position values.
   *
   * A value of 1 means it will move exactly in sync with a camera. A value of 0 means it will not move at all, even if the camera moves. Other values control the degree to which the camera movement is mapped to this Game Object
   *
   * Please be aware that scroll factor values other than 1 are not taken in to consideration when calculating physics collisions. Bodies always collide based on their world position, but changing the scroll factor is a visual adjustment to where the textures are rendered, which can offset them from physics bodies if not accounted for in your code.
   *
   * #phaserDefault 1
   * @type {number}
   */
  export let scrollFactorX: number = undefined

  /**
   * The vertical scroll factor of this Game Object.
   *
   * The scroll factor controls the influence of the movement of a Camera upon this Game Object.
   *
   * When a camera scrolls it will change the location at which this Game Object is rendered on-screen. It does not change the Game Objects actual position values.
   *
   * A value of 1 means it will move exactly in sync with a camera. A value of 0 means it will not move at all, even if the camera moves. Other values control the degree to which the camera movement is mapped to this Game Object.
   *
   * Please be aware that scroll factor values other than 1 are not taken in to consideration when calculating physics collisions. Bodies always collide based on their world position, but changing the scroll factor is a visual adjustment to where the textures are rendered, which can offset them from physics bodies if not accounted for in your code.
   *
   * #phaserDefault 1
   * @type {number}
   */
  export let scrollFactorY: number = undefined

  /**
   * Canvas only.
   *
   * You can control if the Cameras should cull tiles before rendering them or not.
   * By default the camera will try to cull the tiles in this layer, to avoid over-drawing to the renderer.
   *
   * However, there are some instances when you may wish to disable this, and toggling this flag allows you to do so.
   * @type {boolean}
   */
  export let skipCull = undefined

  /**
   * Whether or not this layer is static or dynamic
   * @type {"static"|"dynamic"}
   */
  export let type = 'static'

  /**
   * The names of the tilesets used for this layer in the tilemap
   *
   * #required
   * @type {string[]}
   */
  export let tilesets

  /**
   * The visible state of the Game Object. An invisible Game Object will skip rendering, but will still process update logic.
   * @type {boolean}
   */
  export let visible = undefined

  /**
   * The w position of this Game Object.
   * @type {number}
   */
  export let w = undefined

  /**
   * The width of this Game object.
   * @type {number}
   */
  export let width = undefined

  /**
   * The x position of this Game Object.
   * @type {number}
   */
  export let x = undefined

  /**
   * The y position of this Game Object.
   * @type {number}
   */
  export let y = undefined

  /**
   * The z position of this Game Object.
   *
   * Note: The z position does not control the rendering order of 2D Game Objects. Use depth instead.
   * @type {number}
   */
  export let z = undefined

  /**
   * Sets the active WebGL Pipeline of this Game Object.
   * @type {string}
   */
  export let pipeline = undefined

  const tilemap = getTilemap()

  export let instance =
    type === 'static'
      ? tilemap.createStaticLayer(
          id,
          tilemap.tilesets.filter((ts) => tilesets.includes(ts.name)),
          x,
          y
        )
      : tilemap.createDynamicLayer(
          id,
          tilemap.tilesets.filter((ts) => tilesets.includes(ts.name)),
          x,
          y
        )

  // @ts-ignore
  if (tilemap.useLayerOrder && typeof depth === 'undefined') {
    depth =
      // @ts-ignore
      tilemap.layerOrder.findIndex((layerName) => layerName === id) +
      // @ts-ignore
      tilemap.startingDepth
  }

  setContext('phaser/tilemap-layer', instance)

  $: shouldApplyProps(collisionTiles) &&
    // @ts-ignore
    instance.setCollisionTiles(collisionTiles)

  $: shouldApplyProps(collisionTilesBetween) &&
    instance.setCollisionBetween(
      collisionTilesBetween[0],
      collisionTilesBetween[1]
    )
  $: shouldApplyProps(collisionTilesByExclusion) &&
    instance.setCollisionByExclusion(collisionTilesByExclusion)
  $: shouldApplyProps(collisionTilesByProperty) &&
    instance.setCollisionByProperty(collisionTilesByProperty)

  $: if (shouldApplyProps(cullPaddingX, cullPaddingY)) {
    if (
      cullPaddingX !== instance.cullPaddingX ||
      cullPaddingY !== cullPaddingY
    ) {
      instance.setCullPadding(cullPaddingX, cullPaddingY)
    }
  }

  $: shouldApplyProps(skipCull) && (instance.skipCull = skipCull)

  $: shouldApplyProps(visible) && instance.setVisible(visible)

  onGameEvent('prestep', () => {
    cullPaddingX = instance.cullPaddingX
    cullPaddingY = instance.cullPaddingY
    skipCull = instance.skipCull
  })
</script>

<GameObject
  bind:instance
  bind:name
  bind:renderFlags
  on:pointerdown
  on:pointermove
  on:pointerout
  on:pointerup
  on:pointerwheel
>
  <Alpha
    bind:alpha
    bind:alphaTopLeft
    bind:alphaTopRight
    bind:alphaBottomLeft
    bind:alphaBottomRight
  />
  <BlendMode bind:blendMode />
  <Depth bind:depth />
  <Flip bind:flipX bind:flipY />
  <Origin bind:originX bind:originY bind:displayOriginX bind:displayOriginY />
  <ScrollFactor bind:scrollFactorX bind:scrollFactorY />
  <Size bind:width bind:height bind:displayWidth bind:displayHeight />
  <Pipeline bind:pipeline />
  <Transform
    bind:x
    bind:y
    bind:w
    bind:z
    bind:scale
    bind:scaleX
    bind:scaleY
    bind:angle
  />
  <Visible bind:visible />
  <slot />
</GameObject>
