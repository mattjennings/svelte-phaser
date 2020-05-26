<script>
  import Phaser from './phaser.js'
  import { getScene } from './getScene.js'
  import Shape from './Shape.svelte'

  /**
   * The active state of this Game Object. A Game Object with an active state of true is processed by the
   * Scenes UpdateList, if added to it. An active object is one which is having its logic and internal systems updated.
   * @type {boolean}
   */
  export let active = undefined

  /**
   * The alpha value of the Game Object. This is a global value,
   * impacting the entire Game Object, not just a region of it.
   * @type {number}
   */
  export let alpha = undefined

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
  export let blendMode = undefined

  /**
   * A Data Manager. It allows you to store, query and get key/value paired information specific to this Game Object. null by default.
   * @type {any}
   */
  export let data = undefined

  /**
   * The depth of this Game Object within the Scene.
   * The depth is also known as the 'z-index' in some environments, and allows you to change the rendering order of Game Objects, without actually moving their position in the display list.
   * The depth starts from zero (the default value) and increases from that point. A Game Object with a higher depth value will always render in front of one with a lower value.
   * Setting the depth will queue a depth sort event within the Scene.
   * @type {number}
   */
  export let depth = undefined

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
  export let displayOriginX = undefined

  /**
   * The vertical display origin of this Game Object. The origin is a normalized value between 0 and 1.
   * The displayOrigin is a pixel value, based on the size of the Game Object combined with the origin.
   * @type {number}
   */
  export let displayOriginY = undefined

  /**
   * The displayed width of this Game Object.
   * This value takes into account the scale factor.
   * Setting this value will adjust the Game Object's scale property.
   * @type {number}
   */
  export let displayWidth = undefined

  /**
   * Enables the firing of drag events
   * @type {boolean}
   */
  export let draggable = false

  /**
   * The height of this object.
   * @type {number}
   */
  export let height = undefined

  /**
   * Whether or not the game object should react to input from the pointer. This is true by default,
   * and is required to emit pointer events.
   *
   * If you wish to customize the hit area, you can provide an object containing "shape", "callback", and "dropZone" which
   * will get passed into Phaser's underlying `setInteractive` method.
   *
   * This property is not bindable.
   *
   * See Phaser's documentation for more information:
   *
   * https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Sprite.html#setInteractive__anchor
   *
   * @type {boolean | object}
   */
  export let interactive = true

  /**
   * The Mask this Game Object is using during render.
   * @type {Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask}
   */
  export let mask = undefined

  /**
   * The name of this Game Object. This is not used by Phaser, but some svelte-phaser components such as
   * ArcadeCollider will make use of names to find the reference to the Game Object.
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
  export let originX = undefined

  /**
   * The vertical origin of this Game Object. The origin maps the relationship between the size and position of the Game Object.
   * The default value is 0.5, meaning all Game Objects are positioned based on their center.
   * Setting the value to 0 means the position now relates to the top of the Game Object.
   *
   * #phaserDefault 0.5
   * @type {number}
   */
  export let originY = undefined

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
   * The angle of this Game Object in radians. Phaser uses a right-hand clockwise rotation system, where 0 is right, 90 is down, 180/-180 is left and -90 is up.
   * If you prefer to work in degrees, see the angle property instead.
   * @type {number}
   */
  export let rotation = undefined

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
  export let scrollFactorX = undefined

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
  export let scrollFactorY = undefined

  /**
   * The Tab Index of the Game Object. Reserved for future use by plugins and the Input Manager.
   *
   * #phaserDefault -1
   * @type {number}
   */
  export let tabIndex = undefined

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
   * The default fill alpha.
   *
   * #phaserDefault 1
   * @type {number}
   */
  export let fillAlpha = undefined

  /**
   * The default fill color.
   *
   * The color should be a hex value. ex. red would be 0xff0000
   *
   * #phaserDefault -1
   * @type {number}
   */
  export let fillColor = undefined

  /**
   * The default stroke alpha.
   *
   * #phaserDefault 1
   * @type {number}
   */
  export let strokeAlpha = undefined

  /**
   * The default stroke color.
   *
   * The color should be a hex value. ex. red would be 0xff0000
   *
   * #phaserDefault -1
   * @type {number}
   */
  export let strokeColor = undefined

  /**
   * The stroke line width
   *
   * @type {number}
   */
  export let strokeWidth = undefined

  /**
   * Sets the active WebGL Pipeline of this Game Object.
   * @type {string}
   */
  export let pipeline = undefined

  const scene = getScene()

  export let instance = new Phaser.GameObjects.Rectangle(
    scene,
    x,
    y,
    width,
    height,
    fillColor,
    fillAlpha
  )
</script>

<svelte:options immutable />
<Shape
  bind:instance
  bind:active
  bind:alpha
  bind:angle
  bind:blendMode
  bind:data
  bind:depth
  bind:displayHeight
  bind:displayWidth
  bind:displayOriginX
  bind:displayOriginY
  bind:draggable
  bind:height
  bind:interactive
  bind:mask
  bind:name
  bind:originX
  bind:originY
  bind:renderFlags
  bind:rotation
  bind:scale
  bind:scaleX
  bind:scaleY
  bind:scrollFactorX
  bind:scrollFactorY
  bind:pipeline
  bind:tabIndex
  bind:visible
  bind:w
  bind:width
  bind:x
  bind:y
  bind:z
  bind:fillAlpha
  bind:fillColor
  bind:strokeAlpha
  bind:strokeColor
  bind:strokeWidth
  on:drag
  on:dragenter
  on:dragleave
  on:dragend
  on:dragstart
  on:drop
  on:pointerdown
  on:pointermove
  on:pointerout
  on:pointerup
  on:pointerwheel>
  <slot />
</Shape>
