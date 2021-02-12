<svelte:options immutable />

<script lang="ts">
  import Phaser from 'phaser'
  import { shouldApplyProps } from './util'
  import { onGameEvent } from './onGameEvent'
  import { getScene } from './getScene'

  import GameObject from './GameObject.svelte'
  import Alpha from './phaser-components/Alpha.svelte'
  import BlendMode from './phaser-components/BlendMode.svelte'
  import Depth from './phaser-components/Depth.svelte'
  import Flip from './phaser-components/Flip.svelte'
  import Mask from './phaser-components/Mask.svelte'
  import Origin from './phaser-components/Origin.svelte'
  import Pipeline from './phaser-components/Pipeline.svelte'
  import ScrollFactor from './phaser-components/ScrollFactor.svelte'
  import Size from './phaser-components/Size.svelte'
  import Tint from './phaser-components/Tint.svelte'
  import Transform from './phaser-components/Transform.svelte'
  import Visible from './phaser-components/Visible.svelte'

  /**
   * The active state of this Game Object. A Game Object with an active state of true is processed by the
   * Scenes UpdateList, if added to it. An active object is one which is having its logic and internal systems updated.
   * @type {boolean}
   */
  export let active: boolean = undefined

  /**
   * The alignment of the Text. This only impacts multi-line text.
   *
   * #phaserDefault 'left'
   * @type {'left'|'right'|'center'|'justify'}
   */
  export let align = undefined

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
  export let angle: number = undefined

  /**
   * Whether to automatically round line positions.
   *
   * #phaserDefault true
   * @type {boolean}
   */
  export let autoRound = undefined

  /**
   * A solid fill color that is rendered behind the Text object. Given as a CSS string color such as #ff0.
   * @type {string}
   */
  export let backgroundColor = undefined

  /**
   * The amount of horizontal padding added to the width of the text when calculating the font metrics.
   *
   * #phaserDefault 1.2
   * @type {number}
   */
  export let baselineX = undefined

  /**
   * The amount of vertical padding added to the height of the text when calculating the font metrics.
   *
   * #phaserDefault 1.4
   * @type {number}
   */
  export let baselineY = undefined

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
   * The color the Text is drawn in. Given as a CSS string color such as #fff or rgb()
   * @type {string}
   */
  export let color = undefined

  /**
   * A Data Manager. It allows you to store, query and get key/value paired information specific to this Game Object. null by default.
   * @type {any}
   */
  export let data: any = undefined

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
  export let displayHeight: number = undefined

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
  export let displayWidth: number = undefined

  /**
   * Enables the firing of drag events. `interactive` prop must be provided for Text
   * to know its bounds
   *
   * @type {boolean}
   */
  export let draggable: boolean = false

  /**
   * Force the Text object to have the exact height specified in this property. Leave as zero for it to change accordingly to content.
   *
   * #phaserDefault 0
   * @type {number}
   */
  export let fixedHeight = undefined

  /**
   * Force the Text object to have the exact width specified in this property. Leave as zero for it to change accordingly to content.
   * #phaserDefault 0
   * @type {number}
   */
  export let fixedWidth = undefined

  /**
   * The horizontally flipped state of the Game Object.
   * A Game Object that is flipped horizontally will render inversed on the horizontal axis.
   * Flipping always takes place from the middle of the texture and does not impact the scale value.
   * If this Game Object has a physics body, it will not change the body. This is a rendering toggle only.
   * @type {boolean}
   */
  export let flipX: boolean = undefined

  /**
   * The vertically flipped state of the Game Object.
   * A Game Object that is flipped vertically will render inversed on the vertical axis (i.e. upside down).
   * Flipping always takes place from the middle of the texture and does not impact the scale value.
   * If this Game Object has a physics body, it will not change the body. This is a rendering toggle only.
   * @type {boolean}
   */
  export let flipY: boolean = undefined

  /**
   * The font the Text object will render with. This is a Canvas style font string.
   * #phaserDefault 'Courier'
   * @type {string}
   */
  export let fontFamily = undefined

  /**
   * The font size, as a CSS size string.
   * #phaserDefault '16px'
   * @type {string}
   */
  export let fontSize = undefined

  /**
   * Any addition font styles, such as 'strong'.
   * @type {string}
   */
  export let fontStyle = undefined

  /**
   * The height of this Text object.
   * #phaserDefault 1
   * @type {number}
   */
  export let height: number = undefined

  /**
   * If you want the Text to be reactive to pointer events you will need to provide
   * an object containing "shape", "callback", and optionally "dropZone". This gets
   * passed into Phaser's underlying `setInteractive` method.
   *
   * This property is not bindable.
   *
   * See Phaser's documentation for more information:
   *
   * https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Sprite.html#setInteractive__anchor
   *
   * @type {object}
   */
  export let interactive = false

  /**
   * The line spacing value. This value is added to the font height to calculate the overall line height.
   * Only has an effect if this Text object contains multiple lines of text.
   * @type {number}
   */
  export let lineSpacing = undefined

  /**
   * The Mask this Game Object is using during render.
   * @type {Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask}
   */
  export let mask:
    | Phaser.Display.Masks.BitmapMask
    | Phaser.Display.Masks.GeometryMask = undefined

  /**
   * The maximum number of lines to display within the Text object.
   * #phaserDefault 0
   * @type {number}
   */
  export let maxLines = undefined

  /**
   * The name of this Game Object. This is not used by Phaser, but some svelte-phaser components such as
   * ArcadeCollider will make use of names to find the reference to the Game Object.
   * @type {string}
   */
  export let name: string = undefined

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
   * Specify a padding value which is added to the line width and height when calculating the Text size.
   * Allows you to add extra spacing if the browser is unable to accurately determine the true font dimensions.
   * @type {Phaser.Types.GameObjects.Text.TextPadding}
   */
  export let padding = undefined

  /**
   * The flags that are compared against RENDER_MASK to determine if this Game Object will render or not.
   * The bits are 0001 | 0010 | 0100 | 1000 set by the components Visible, Alpha, Transform and Texture respectively.
   * If those components are not used by your custom class then you can use this bitmask as you wish.
   *
   * #phaserDefault 15
   * @type {number}
   */
  export let renderFlags: number = undefined

  /**
   * Sets the resolution (DPI setting) of the Text object. Leave at zero for it to use the game resolution.
   *
   * #phaserDefault 0
   * @type {number}
   */
  export let resolution = undefined

  /**
   * The angle of this Game Object in radians. Phaser uses a right-hand clockwise rotation system, where 0 is right, 90 is down, 180/-180 is left and -90 is up.
   * If you prefer to work in degrees, see the angle property instead.
   * @type {number}
   */
  export let rotation: number = undefined

  /**
   * Set to true if this Text object should render from right-to-left.
   * @type {boolean}
   */
  export let rtl = false

  /**
   * Sets the active WebGL Pipeline of this Game Object.
   * @type {string | object}
   */
  export let pipeline:
    | string
    | { name: string; data: object; copy?: boolean } = undefined

  /**
   * The WebGL Post FX Pipelines this Game Object uses for post-render effects.
   * The pipelines are processed in the order in which they appear in this array.
   * @type {Phaser.Renderer.WebGL.Pipelines.PostFXPipeline}
   */
  export let postPipeline: Phaser.Renderer.WebGL.Pipelines.PostFXPipeline[] = undefined

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
  export let scale: number = undefined

  /**
   * The horizontal scale of this Game Object.
   *
   * #phaserDefault 1
   * @type {number}
   */
  export let scaleX: number = undefined

  /**
   * The vertical scale of this Game Object.
   *
   * #phaserDefault 1
   * @type {number}
   */
  export let scaleY: number = undefined

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
   * Applies a shadow to the text
   *
   * @type {Phaser.Types.GameObjects.Text.TextShadow}
   */
  export let shadow = undefined

  /**
   * The Regular Expression that is used to split the text up into lines, in multi-line text.
   *
   * #phaserDefault /(?:\r\n|\r|\n)/
   * @type {string}
   */
  export let splitRegExp = undefined

  /**
   * The color used to stroke the Text if the strokeThickness property is greater than zero.
   *
   * #phaserDefault '#fff'
   * @type {number}
   */
  export let stroke = undefined

  /**
   * The thickness of the stroke around the Text. Set to zero for no stroke.
   *
   * #phaserDefault 0
   * @type {number}
   */
  export let strokeThickness = undefined

  /**
   * The Tab Index of the Game Object. Reserved for future use by plugins and the Input Manager.
   *
   * #phaserDefault -1
   * @type {number}
   */
  export let tabIndex: number = undefined

  /**
   * This is the string used to aid Canvas in calculating the height of the font.
   *
   * #phaserDefault '|MÃ‰qgy'
   * @type {number}
   */
  export let testString = undefined

  /**
   * The text string being rendered by this Text Game Object.
   *
   * #required
   * @type {string}
   */
  export let text

  /**
   * The tint value being applied to the bottom-left of the Game Object. This value is interpolated from the corner to the center of the Game Object.
   * @type {number}
   */
  export let tintBottomLeft: number = undefined

  /**
   * The tint value being applied to the bottom-right of the Game Object. This value is interpolated from the corner to the center of the Game Object.
   * @type {number}
   */
  export let tintBottomRight: number = undefined

  /**
   * Fill or additive?
   *
   * #phaserDefault false
   * @type {boolean}
   */
  export let tintFill: boolean = undefined

  /**
   * The tint value being applied to the top-left of the Game Object. This value is interpolated from the corner to the center of the Game Object.
   * @type {number}
   */
  export let tintTopLeft: number = undefined

  /**
   * The tint value being applied to the top-right of the Game Object. This value is interpolated from the corner to the center of the Game Object.
   * @type {number}
   */
  export let tintTopRight: number = undefined

  /**
   * The visible state of the Game Object. An invisible Game Object will skip rendering, but will still process update logic.
   * @type {boolean}
   */
  export let visible: boolean = undefined

  /**
   * The w position of this Game Object.
   * @type {number}
   */
  export let w: number = undefined

  /**
   * The width of this Text object.
   * @type {number}
   */
  export let width: number = undefined

  /**
   * The width at which the text should start wrapping
   *
   * @type {number}
   */
  export let wordWrap = undefined

  /**
   * Whether or not to use the advanced wrapping algorithm. If true, spaces are collapsed and whitespace is trimmed from lines. If false, spaces and whitespace are left as is.
   *
   * #phaserDefault false
   * @type {boolean}
   */
  export let useAdvancedWordWrap = undefined

  /**
   * The x position of this Game Object.
   * @type {number}
   */
  export let x: number = undefined

  /**
   * The y position of this Game Object.
   * @type {number}
   */
  export let y: number = undefined

  /**
   * The z position of this Game Object.
   *
   * Note: The z position does not control the rendering order of 2D Game Objects. Use depth instead.
   * @type {number}
   */
  export let z: number = undefined

  const scene = getScene()

  export let instance = new Phaser.GameObjects.Text(scene, x, y, text, {})

  $: shouldApplyProps(align) && instance.setAlign(align)

  $: shouldApplyProps(autoRound) && (instance.autoRound = autoRound)

  $: shouldApplyProps(backgroundColor) &&
    instance.setBackgroundColor(backgroundColor)

  $: shouldApplyProps(baselineX) && (instance.style.baselineX = baselineX)

  $: shouldApplyProps(baselineY) && (instance.style.baselineY = baselineY)

  $: shouldApplyProps(color) && instance.setColor(color)

  $: if (shouldApplyProps(fixedWidth, fixedHeight)) {
    instance.setFixedSize(fixedWidth, fixedHeight)
  }

  $: shouldApplyProps(fontFamily) && instance.setFontFamily(fontFamily)
  $: shouldApplyProps(fontSize) && instance.setFontSize(fontSize)
  $: shouldApplyProps(fontStyle) && instance.setFontStyle(fontStyle)

  $: shouldApplyProps(lineSpacing) && instance.setLineSpacing(lineSpacing)

  $: shouldApplyProps(maxLines) && instance.setMaxLines(maxLines)

  $: shouldApplyProps(padding) &&
    instance.setPadding(padding, padding, padding, padding)

  $: shouldApplyProps(resolution) && instance.setResolution(resolution)

  $: shouldApplyProps(rtl) && (instance.style.rtl = rtl)

  $: if (shouldApplyProps(shadow)) {
    instance.setShadow(
      shadow.x,
      shadow.y,
      shadow.color,
      shadow.blur,
      shadow.stroke,
      shadow.fill
    )
  }

  $: shouldApplyProps(splitRegExp) && (instance.splitRegExp = splitRegExp)

  $: if (shouldApplyProps(stroke, strokeThickness)) {
    instance.setStroke(stroke, strokeThickness)
  }

  // @ts-ignore
  $: shouldApplyProps(testString) && (instance.testString = testString)

  $: if (shouldApplyProps(wordWrap, useAdvancedWordWrap)) {
    instance.setWordWrapWidth(wordWrap, useAdvancedWordWrap)
  }
  $: shouldApplyProps(text) && instance.setText(text)

  onGameEvent('prestep', () => {
    autoRound = instance.autoRound
    backgroundColor = instance.style.backgroundColor
    align = instance.style.align
    baselineX = instance.style.baselineX
    baselineY = instance.style.baselineY
    fixedHeight = instance.style.fixedHeight
    fixedWidth = instance.style.fixedWidth
    fontFamily = instance.style.fontFamily
    fontSize = instance.style.fontSize
    fontStyle = instance.style.fontStyle
    resolution = instance.style.resolution
    lineSpacing = instance.lineSpacing
    maxLines = instance.style.maxLines
    renderFlags = instance.renderFlags
    rtl = instance.style.rtl

    if (
      shadow &&
      (shadow.offsetX !== instance.style.shadowOffsetX ||
        shadow.offsetY !== instance.style.shadowOffsetY ||
        shadow.color !== instance.style.shadowColor ||
        shadow.blur !== instance.style.shadowBlur ||
        shadow.stroke !== instance.style.shadowStroke ||
        shadow.fill !== instance.style.shadowFill)
    ) {
      shadow = {
        offsetX: instance.style.shadowOffsetX,
        offsetY: instance.style.shadowOffsetY,
        color: instance.style.shadowColor,
        blur: instance.style.shadowBlur,
        stroke: instance.style.shadowStroke,
        fill: instance.style.shadowFill,
      }
    }

    splitRegExp = instance.splitRegExp
    stroke = instance.style.stroke
    strokeThickness = instance.style.strokeThickness
    testString = instance.style.testString
    text = instance.text
    // @ts-ignore
    wordWrap = instance.style.wordWrapWidth
    // @ts-ignore
    useAdvancedWordWrap = instance.style.wordWrapUseAdvanced
  })
</script>

<GameObject
  bind:instance
  bind:active
  bind:name
  bind:tabIndex
  bind:data
  bind:renderFlags
  bind:draggable
  bind:interactive
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
  <Mask bind:mask />
  <Origin bind:originX bind:originY bind:displayOriginX bind:displayOriginY />
  <ScrollFactor bind:scrollFactorX bind:scrollFactorY />
  <Size bind:width bind:height bind:displayWidth bind:displayHeight />
  <Pipeline bind:pipeline bind:postPipeline />
  <Transform
    bind:x
    bind:y
    bind:w
    bind:z
    bind:scale
    bind:scaleX
    bind:scaleY
    bind:angle
    bind:rotation
  />
  <Tint
    bind:tintTopLeft
    bind:tintTopRight
    bind:tintBottomLeft
    bind:tintBottomRight
    bind:tintFill
  />
  <Visible bind:visible />
  <slot />
</GameObject>
