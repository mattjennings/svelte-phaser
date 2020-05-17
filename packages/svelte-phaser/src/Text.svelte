<script>
  import Phaser from './phaser.js'
  import {
    onMount,
    getContext,
    setContext,
    createEventDispatcher,
  } from 'svelte'
  import { addInstance, shouldApplyProps } from './util'
  import {
    applyAlpha,
    applyScale,
    applyTint,
    applyGameObjectEventDispatchers,
  } from './props/index'
  import { onGameEvent } from './onGameEvent'

  /**
   * The active state of this Game Object. A Game Object with an active state of true is processed by the
   * Scenes UpdateList, if added to it. An active object is one which is having its logic and internal systems updated.
   * @type {boolean}
   */
  export let active = undefined

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
  export let alpha = undefined

  /**
   * The alpha value starting from the bottom-left of the Game Object.
   * This value is interpolated from the corner to the center of the Game Object.
   * @type {number}
   */
  export let alphaBottomLeft = undefined

  /**
   * The alpha value starting from the bottom-right of the Game Object.
   * This value is interpolated from the corner to the center of the Game Object.
   * @type {string}
   */
  export let alphaBottomRight = undefined

  /**
   * The alpha value starting from the top-left of the Game Object.
   * This value is interpolated from the corner to the center of the Game Object.
   * @type {string}
   */
  export let alphaTopLeft = undefined

  /**
   * The alpha value starting from the top-right of the Game Object.
   * This value is interpolated from the corner to the center of the Game Object.
   * @type {number}
   */
  export let alphaTopRight = undefined

  /**
   * The angle of this Game Object as expressed in degrees.
   * Phaser uses a right-hand clockwise rotation system, where 0 is right, 90 is down, 180/-180 is left and -90 is up.
   * If you prefer to work in radians, see the rotation property instead.
   * @type {number}
   */
  export let angle = undefined

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
  export let blendMode = undefined

  /**
   * The color the Text is drawn in. Given as a CSS string color such as #fff or rgb()
   * @type {string}
   */
  export let color = undefined

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
  export let flipX = undefined

  /**
   * The vertically flipped state of the Game Object.
   * A Game Object that is flipped vertically will render inversed on the vertical axis (i.e. upside down).
   * Flipping always takes place from the middle of the texture and does not impact the scale value.
   * If this Game Object has a physics body, it will not change the body. This is a rendering toggle only.
   * @type {boolean}
   */
  export let flipY = undefined

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
   * The Texture Frame this Game Object is using to render with.
   * @type {Phaser.Textures.Frame}
   */
  export let frame = undefined

  /**
   * The height of this Text object.
   * #phaserDefault 1
   * @type {number}
   */
  export let height = undefined

  /**
   * If you want the Text to be reactive to pointer events you will need to provide
   * an object containing "shape", "callback", and "dropZone". This gets
   * passed into Phaser's underlying `setInteractive` method.
   *
   * This property is not bindable.
   *
   * See Phaser's documentation for more information:
   *
   * https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Sprite.html#setInteractive__anchor
   *
   * @type {boolean | object}
   */
  export let interactive = undefined

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
  export let mask = undefined

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
  export let renderFlags = undefined

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
  export let rotation = undefined

  /**
   * Set to true if this Text object should render from right-to-left.
   * @type {boolean}
   */
  export let rtl = false

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
  export let tabIndex = undefined

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
  export let tintBottomLeft = undefined

  /**
   * The tint value being applied to the bottom-right of the Game Object. This value is interpolated from the corner to the center of the Game Object.
   * @type {number}
   */
  export let tintBottomRight = undefined

  /**
   * Fill or additive?
   *
   * #phaserDefault false
   * @type {boolean}
   */
  export let tintFill = undefined

  /**
   * The tint value being applied to the top-left of the Game Object. This value is interpolated from the corner to the center of the Game Object.
   * @type {number}
   */
  export let tintTopLeft = undefined

  /**
   * The tint value being applied to the top-right of the Game Object. This value is interpolated from the corner to the center of the Game Object.
   * @type {number}
   */
  export let tintTopRight = undefined

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
   * The width of this Text object.
   * @type {number}
   */
  export let width = undefined

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

  const dispatch = createEventDispatcher()
  const scene = getContext('phaser/scene')

  export let instance = new Phaser.GameObjects.Text(scene, x, y, text, {})

  setContext('phaser/game-object', instance)

  if (!scene.children.exists(instance)) {
    addInstance(instance)
    const cleanupDispatchers = applyGameObjectEventDispatchers(
      instance,
      dispatch
    )
    onMount(() => () => {
      cleanupDispatchers()
      instance.destroy()
    })
  }

  $: if (interactive === true) {
    instance.setInteractive()
  } else if (!interactive) {
    instance.removeInteractive()
  } else {
    instance.setInteractive(
      interactive.shape,
      interactive.callback,
      interactive.dropzone
    )
  }

  $: shouldApplyProps(active) &&
    active !== instance.active &&
    instance.setActive(active)

  $: shouldApplyProps(align) &&
    align !== instance.align &&
    instance.setAlign(align)

  $: applyAlpha(instance, {
    alpha,
    alphaBottomLeft,
    alphaBottomRight,
    alphaTopLeft,
    alphaTopRight,
  })

  $: shouldApplyProps(angle) &&
    angle !== instance.angle &&
    instance.setAngle(angle)

  $: shouldApplyProps(autoRound) && (instance.autoRound = autoRound)

  $: shouldApplyProps(backgroundColor) &&
    backgroundColor !== instance.backgroundColor &&
    instance.setBackgroundColor(backgroundColor)

  $: shouldApplyProps(baselineX) &&
    baselineX !== instance.style.baselineX &&
    (instance.style.baselineX = baselineX)

  $: shouldApplyProps(baselineY) &&
    instance !== instance.style.instance &&
    (instance.style.baselineY = baselineY)

  $: shouldApplyProps(blendMode) &&
    blendMode !== instance.blendMode &&
    instance.setBlendMode(blendMode)

  $: shouldApplyProps(color) &&
    color !== instance.style.color &&
    instance.setColor(color)

  $: shouldApplyProps(data) && instance.setData(data)

  $: shouldApplyProps(depth) &&
    depth !== instance.depth &&
    instance.setDepth(depth)

  $: if (shouldApplyProps(displayHeight, displayWidth)) {
    if (
      displayWidth !== instance.displayWidth ||
      displayHeight !== instance.displayHeight
    ) {
      instance.setDisplaySize(displayWidth, displayHeight)
    }
  }

  $: {
    if (shouldApplyProps(displayOriginX, displayOriginY)) {
      if (
        displayOriginX !== instance.displayOriginX ||
        displayOriginY !== instance.displayOriginY
      ) {
        instance.setDisplayOrigin(displayOriginX, displayOriginY)
      }
    }
  }

  $: if (shouldApplyProps(fixedWidth, fixedHeight)) {
    if (
      fixedWidth !== instance.style.fixedWidth ||
      fixedHeight !== instance.style.fixedHeight
    ) {
      instance.setFixedSize(fixedWidth, fixedHeight)
    }
  }

  $: shouldApplyProps(flipX) &&
    flipX !== instance.flipX &&
    instance.setFlipX(flipX)

  $: shouldApplyProps(flipY) &&
    flipY !== instance.flipY &&
    instance.setFlipY(flipY)

  $: shouldApplyProps(fontFamily) &&
    fontFamily !== instance.style.fontFamily &&
    instance.setFontFamily(fontFamily)

  $: shouldApplyProps(fontSize) &&
    fontSize !== instance.style.fontSize &&
    instance.setFontSize(fontSize)

  $: shouldApplyProps(fontStyle) &&
    fontStyle !== instance.style.fontStyle &&
    instance.setFontStyle(fontStyle)

  $: if (shouldApplyProps(frame)) {
    if (
      !instance.frame ||
      !instance.frame.texture ||
      frame !== instance.frame.name
    ) {
      instance.setFrame(frame)
    }
  }

  $: if (shouldApplyProps(height, width)) {
    if (width !== instance.width || height !== instance.height) {
      instance.setSize(width, height)
    }
  }

  $: shouldApplyProps(lineSpacing) &&
    lineSpacing !== instance.lineSpacing &&
    instance.setLineSpacing(lineSpacing)

  $: shouldApplyProps(mask) && mask !== instance.mask && instance.setMask(mask)

  $: shouldApplyProps(maxLines) &&
    maxLines !== instance.style.maxLines &&
    instance.setMaxLines(maxLines)

  $: shouldApplyProps(name) && name !== instance.name && instance.setName(name)

  $: if (shouldApplyProps(originX, originY)) {
    if (originX !== instance.originX || originY !== instance.originY) {
      instance.setOrigin(originX, originY)
    }
  }

  $: shouldApplyProps(padding) &&
    padding !== instance.padding &&
    instance.setPadding(padding)

  $: shouldApplyProps(renderFlags) && (instance.renderFlags = renderFlags)

  $: shouldApplyProps(resolution) &&
    resolution !== instance.resolution &&
    instance.setResolution(resolution)

  $: shouldApplyProps(rotation) &&
    rotation !== instance.rotation &&
    instance.setRotation(rotation)

  $: shouldApplyProps(rtl) && (instance.style.rtl = rtl)

  $: applyScale(instance, { scale, scaleX, scaleY })

  $: if (shouldApplyProps(scrollFactorX, scrollFactorY)) {
    if (
      scrollFactorX !== instance.scrollFactorX ||
      scrollFactorY !== instance.scrollFactorY
    ) {
      instance.setScrollFactor(scrollFactorX, scrollFactorY)
    }
  }

  $: if (shouldApplyProps(shadow)) {
    if (
      shadow.offsetX !== instance.style.shadowOffsetX ||
      shadow.offsetY !== instance.style.shadowOffsetY ||
      shadow.color !== instance.style.shadowColor ||
      shadow.blur !== instance.style.shadowBlur ||
      shadow.stroke !== instance.style.shadowStroke ||
      shadow.fill !== instance.style.shadowFill
    ) {
      instance.setShadow(
        shadow.x,
        shadow.y,
        shadow.color,
        shadow.blur,
        shadow.stroke,
        shadow.fill
      )
    }
  }

  $: shouldApplyProps(splitRegExp) && (instance.splitRegExp = splitRegExp)

  $: if (shouldApplyProps(stroke, strokeThickness)) {
    if (
      stroke !== instance.style.stroke ||
      strokeThickness !== instance.style.strokeThickness
    ) {
      instance.setStroke(stroke, strokeThickness)
    }
  }

  $: shouldApplyProps(tabIndex) && (instance.tabIndex = tabIndex)

  $: shouldApplyProps(testString) && (instance.testString = testString)

  $: applyTint(instance, {
    tintBottomLeft,
    tintBottomRight,
    tintTopLeft,
    tintTopRight,
    tintFill,
  })

  $: shouldApplyProps(visible) &&
    visible !== instance.visible &&
    instance.setVisible(visible)

  $: shouldApplyProps(w) && w !== instance.w && instance.setW(w)

  $: if (shouldApplyProps(wordWrap, useAdvancedWordWrap)) {
    if (
      wordWrap !== instance.style.wordWrapWidth ||
      useAdvancedWordWrap !== instance.style.wordWrapUseAdvanced
    ) {
      instance.setWordWrapWidth(wordWrap, useAdvancedWordWrap)
    }
  }

  $: shouldApplyProps(x) && x !== instance.x && instance.setX(x)
  $: shouldApplyProps(y) && y !== instance.y && instance.setY(y)
  $: shouldApplyProps(z) && z !== instance.z && instance.setZ(z)
  $: shouldApplyProps(text) && text !== instance.text && instance.setText(text)

  // position values will conflict with velocity if they're
  // in the prestep event. it seems fine in prerender...
  onGameEvent('prerender', () => {
    w = instance.w
    x = instance.x
    y = instance.y
    z = instance.z
  })

  onGameEvent('prestep', () => {
    active = instance.active
    align = instance.align
    alpha = instance.alpha
    alphaBottomLeft = instance.alphaBottomLeft
    alphaBottomRight = instance.alphaBottomRight
    alphaTopLeft = instance.alphatTopLeft
    alphaTopRight = instance.alphaTopRight
    angle = instance.angle
    autoRound = instance.autoRound
    backgroundColor = instance.style.backgroundColor
    baselineX = instance.style.baselineX
    baselineY = instance.style.baselineY
    blendMode = instance.blendMode
    if (instance.data) {
      data = instance.data.get()
    }
    displayOriginX = instance.displayOriginX
    displayOriginY = instance.displayOriginY
    fixedHeight = instance.style.fixedHeight
    fixedWidth = instance.style.fixedWidth
    flipX = instance.flipX
    flipY = instance.flipY
    fontFamily = instance.style.fontFamily
    fontSize = instance.style.fontSize
    fontStyle = instance.style.fontStyle
    height = instance.height
    lineSpacing = instance.lineSpacing
    mask = instance.mask
    maxLines = instance.style.maxLines
    name = instance.name
    originX = instance.originX
    originY = instance.originY
    padding = instance.padding
    renderFlags = instance.renderFlags
    resolution = instance.resolution
    rotation = instance.rotation
    rtl = instance.style.rtl
    scale = instance.scale
    scaleX = instance.scaleX
    scaleY = instance.scaleY
    scrollFactorX = instance.scrollFactorX
    scrollFactorY = instance.scrollFactorY

    shadow = {
      offsetX: instance.style.shadowOffsetX,
      offsetY: instance.style.shadowOffsetY,
      color: instance.style.shadowColor,
      blur: instance.style.shadowBlur,
      stroke: instance.style.shadowStroke,
      fill: instance.style.fill,
    }

    splitRegExp = instance.splitRegExp
    stroke = instance.style.stroke
    strokeThickness = instance.style.strokeThickness
    tabIndex = instance.tabIndex
    testString = instance.style.testString
    text = instance.text
    tintBottomLeft = instance.tintBottomLeft
    tintBottomRight = instance.tintBottomRight
    tintTopLeft = instance.tintTopLeft
    tintTopRight = instance.tintTopRight
    tintFill = instance.tintFill

    visible = instance.visible
    width = instance.width
    wordWrap = instance.style.wordWrapWidth
    useAdvancedWordWrap = instance.style.wordWrapUseAdvanced
  })
</script>

<slot />
