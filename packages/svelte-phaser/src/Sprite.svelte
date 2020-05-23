<script>
  import Phaser from './phaser.js'
  import {
    onMount,
    getContext,
    setContext,
    createEventDispatcher,
  } from 'svelte'
  import {
    addInstance,
    shouldApplyProps,
    createPhaserEventDispatcher,
  } from './util'
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
   * The key of the animation to play. Animations should be created via `scene.anims.create`,
   * ideally in the `create` method of a Scene component.
   * @type {string}
   */
  export let animation = undefined

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
   * Sets the amount of time, in milliseconds, that the animation will be delayed before starting playback.
   * @type {number}
   */
  export let delay = undefined

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
   * How long the animation should play for, in milliseconds. If the frameRate property has been set then it overrides this value, otherwise the frameRate is derived from duration.
   * @type {number}
   */
  export let duration = undefined

  /**
   * Enables the firing of drag events
   * @type {boolean}
   */
  export let draggable = false

  /**
   * The horizontally flipped state of the Game Object.
   * A Game Object that is flipped horizontally will render inversed on the horizontal axis.
   * Flipping always takes place from the middle of the texture and does not impact the scale value.
   * If this Game Object has a physics body, it will not change the body. This is a rendering toggle only.
   *
   * #phaserDefault false
   * @type {boolean}
   */
  export let flipX = undefined

  /**
   * The vertically flipped state of the Game Object.
   * A Game Object that is flipped vertically will render inversed on the vertical axis (i.e. upside down).
   * Flipping always takes place from the middle of the texture and does not impact the scale value.
   * If this Game Object has a physics body, it will not change the body. This is a rendering toggle only.
   *
   * #phaserDefault false
   * @type {boolean}
   */
  export let flipY = undefined

  /**
   * Will the playhead move forwards (true) or in reverse (false).
   *
   * #phaserDefault true
   * @type {boolean}
   */
  export let forward = undefined

  /**
   * The Texture Frame this Game Object is using to render with.
   * @type {Phaser.Textures.Frame}
   */
  export let frame = undefined

  /**
   * The frame rate of playback in frames per second. The default is 24 if the duration property is null.
   *
   * @type {number}
   */
  export let frameRate = undefined

  /**
   * The height of this Text object.
   * #phaserDefault 1
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
   * ms per frame, not including frame specific modifiers that may be present in the Animation data.
   * @type {number}
   */
  export let msPerFrame = undefined

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
   * Takes a value between 0 and 1 and uses it to set how far this animation is through playback. Does not factor in repeats or yoyos, but does handle playing forwards or backwards.
   * @type {number}
   */
  export let progress = undefined

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
   * The number of times that the animation should repeat after its first iteration.
   * For example, if repeat is 1, the animation will play a total of twice (the initial play plus 1 repeat).
   * To repeat indefinitely, use -1. repeat should always be an integer.
   * @type {number}
   */
  export let repeat = undefined

  /**
   * Sets the amount of time in seconds between repeats.
   * For example, if repeat is 2 and repeatDelay is 10, the animation will play initially,
   * then wait for 10 seconds before repeating, then play again,
   * then wait another 10 seconds before doing its final repeat.
   * @type {number}
   */
  export let repeatDelay = undefined

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
   * Skip frames if the time lags, or always advanced anyway?
   *
   * #phaserDefault true
   * @type {boolean}
   */
  export let skipMissedFrames = undefined

  /**
   * Whether or not the animation is playing
   *
   * @type {boolean}
   */
  export let isPlaying = undefined

  /**
   * Stops the current animation from playing after the specified time delay, given in milliseconds.
   *
   * This property is not bindable
   * @type {number}
   */
  export let stopAfterDelay = undefined

  /**
   * Stops the current animation from playing when it next sets the given frame. If this frame doesn't exist within the animation it will not stop it from playing.
   *
   * This property is not bindable
   * @type {Phaser.Animations.AnimationFrame}
   */
  export let stopOnFrame = undefined

  /**
   * The Tab Index of the Game Object. Reserved for future use by plugins and the Input Manager.
   *
   * #phaserDefault -1
   * @type {number}
   */
  export let tabIndex = undefined

  /**
   * The Texture this Game Object is using to render with. It is not required if you are
   * assigning an `animation`.
   * @type {string}
   */
  export let texture = undefined

  /**
   * Sets the Time Scale factor, allowing you to make the animation go go faster or slower than default.
   * Where 1 = normal speed (the default), 0.5 = half speed, 2 = double speed, etc.
   * @type {number}
   */
  export let timeScale = undefined

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
   * Sets if the current Animation will yoyo when it reaches the end.
   * A yoyo'ing animation will play through consecutively,
   * and then reverse-play back to the start again.
   * @type {boolean}
   */
  export let yoyo = undefined

  const dispatch = createEventDispatcher()
  const scene = getContext('phaser/scene')

  export let instance = new Phaser.GameObjects.Sprite(
    scene,
    x,
    y,
    texture,
    frame
  )

  setContext('phaser/game-object', instance)

  if (!scene.children.exists(instance)) {
    addInstance(instance)

    const cleanupGameObjectDispatchers = applyGameObjectEventDispatchers(
      instance,
      dispatch
    )

    const spriteEventListeners = [
      createPhaserEventDispatcher(
        instance,
        dispatch,
        'animationcomplete',
        (animation, frame, gameObject) => ({
          animation,
          frame,
          gameObject,
        })
      ),
      createPhaserEventDispatcher(
        instance,
        dispatch,
        'animationrepeat',
        (animation, frame) => ({
          animation,
          frame,
        })
      ),
      createPhaserEventDispatcher(
        instance,
        dispatch,
        'animationrestart',
        (animation, frame, gameObject) => ({
          animation,
          frame,
          gameObject,
        })
      ),
      createPhaserEventDispatcher(
        instance,
        dispatch,
        'animationstart',
        (animation, frame, gameObject) => ({
          animation,
          frame,
          gameObject,
        })
      ),
    ]
    onMount(() => () => {
      cleanupGameObjectDispatchers()
      spriteEventListeners.forEach(listener => listener())
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

  $: shouldApplyProps(active) && instance.setActive(active)

  $: applyAlpha(instance, {
    alpha,
    alphaBottomLeft,
    alphaBottomRight,
    alphaTopLeft,
    alphaTopRight,
  })

  $: shouldApplyProps(angle) && instance.setAngle(angle)

  $: shouldApplyProps(blendMode) && instance.setBlendMode(blendMode)

  $: shouldApplyProps(data) && instance.setData(data)

  $: shouldApplyProps(depth) && instance.setDepth(depth)

  $: if (shouldApplyProps(displayHeight, displayWidth)) {
    instance.setDisplaySize(displayWidth, displayHeight)
  }

  $: if (shouldApplyProps(displayOriginX, displayOriginY)) {
    instance.setDisplayOrigin(displayOriginX, displayOriginY)
  }

  $: shouldApplyProps(flipX) && instance.setFlipX(flipX)

  $: shouldApplyProps(flipY) && instance.setFlipY(flipY)

  $: if (shouldApplyProps(height, width)) {
    instance.setSize(width, height)
  }

  $: shouldApplyProps(mask) && instance.setMask(mask)

  $: shouldApplyProps(name) && instance.setName(name)

  $: if (shouldApplyProps(originX, originY)) {
    instance.setOrigin(originX, originY)
  }

  $: shouldApplyProps(renderFlags) && (instance.renderFlags = renderFlags)

  $: shouldApplyProps(rotation) && instance.setRotation(rotation)

  $: applyScale(instance, { scale, scaleX, scaleY })

  $: if (shouldApplyProps(scrollFactorX, scrollFactorY)) {
    instance.setScrollFactor(scrollFactorX, scrollFactorY)
  }

  $: shouldApplyProps(tabIndex) && (instance.tabIndex = tabIndex)

  $: applyTint(instance, {
    tintBottomLeft,
    tintBottomRight,
    tintTopLeft,
    tintTopRight,
    tintFill,
  })

  $: shouldApplyProps(visible) && instance.setVisible(visible)

  $: shouldApplyProps(w) && instance.setW(w)
  $: shouldApplyProps(x) && instance.setX(x)
  $: shouldApplyProps(y) && instance.setY(y)
  $: shouldApplyProps(z) && instance.setZ(z)

  $: if (shouldApplyProps(texture, frame)) {
    instance.setTexture(texture, frame)
  }

  // animation props
  $: if (shouldApplyProps(animation)) {
    instance.anims.play(animation, true)
  }

  $: if (shouldApplyProps(isPlaying)) {
    instance.anims.isPlaying = isPlaying
  }

  $: shouldApplyProps(delay) && instance.anims.setDelay(delay)

  $: shouldApplyProps(duration) && (instance.anims.duration = duration)
  $: shouldApplyProps(forward) && (instance.anims.forward = forward)
  $: shouldApplyProps(frameRate) && (instance.anims.frameRate = frameRate)
  $: shouldApplyProps(msPerFrame) && (instance.anims.msPerFrame = msPerFrame)

  $: shouldApplyProps(skipMissedFrames) &&
    (instance.anims.skipMissedFrames = skipMissedFrames)

  $: shouldApplyProps(progress) && instance.anims.setProgress(progress)

  $: shouldApplyProps(stopOnFrame) && instance.anims.stopOnFrame(stopOnFrame)

  $: shouldApplyProps(stopAfterDelay) &&
    instance.anims.stopAfterDelay(stopAfterDelay)

  $: shouldApplyProps(repeat) && instance.anims.setRepeat(repeat)

  $: shouldApplyProps(repeatDelay) && instance.anims.setRepeatDelay(repeatDelay)

  $: shouldApplyProps(timeScale) && instance.anims.setTimeScale(timeScale)

  $: shouldApplyProps(yoyo) && instance.anims.setYoyo(yoyo)

  $: shouldApplyProps(draggable) &&
    scene.input.setDraggable(instance, draggable)

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
    alpha = instance.alpha
    alphaBottomLeft = instance.alphaBottomLeft
    alphaBottomRight = instance.alphaBottomRight
    alphaTopLeft = instance.alphaTopLeft
    alphaTopRight = instance.alphaTopRight
    angle = instance.angle
    blendMode = instance.blendMode
    if (instance.data) {
      data = instance.data.get()
    }
    displayOriginX = instance.displayOriginX
    displayOriginY = instance.displayOriginY
    flipX = instance.flipX
    flipY = instance.flipY
    height = instance.height
    mask = instance.mask
    name = instance.name
    originX = instance.originX
    originY = instance.originY
    renderFlags = instance.renderFlags
    rotation = instance.rotation
    scale = instance.scale
    scaleX = instance.scaleX
    scaleY = instance.scaleY
    scrollFactorX = instance.scrollFactorX
    scrollFactorY = instance.scrollFactorY
    tabIndex = instance.tabIndex
    tintBottomLeft = instance.tintBottomLeft
    tintBottomRight = instance.tintBottomRight
    tintTopLeft = instance.tintTopLeft
    tintTopRight = instance.tintTopRight
    tintFill = instance.tintFill
    visible = instance.visible
    width = instance.width

    if (instance.texture) {
      texture = instance.texture.key
    }

    if (instance.frame) {
      frame = instance.frame.key
    }

    if (instance.anims) {
      if (instance.anims.currentAnim && instance.anims.currentAnim.key) {
        animation = instance.anims.currentAnim.key
      }
      isPlaying = instance.anims.isPlaying
      delay = instance.anims.getDelay()
      duration = instance.anims.duration
      forward = instance.anims.forward
      frameRate = instance.anims.frameRate
      msPerFrame = instance.anims.msPerFrame
      skipMissedFrames = instance.anims.skipMissedFrames
      if (instance.anims.currentFrame) {
        progress = instance.anims.getProgress()
      }
      repeat = instance.anims.getRepeat()
      repeatDelay = instance.anims.getRepeatDelay()
      timeScale = instance.anims.getTimeScale()
      yoyo = instance.anims.getYoyo()
    }
  })
</script>

<svelte:options immutable />
<slot />
