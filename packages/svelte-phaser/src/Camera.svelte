<script>
  import Phaser from './phaser.js'
  import { getScene } from './getScene'
  import { setContext } from 'svelte'
  import { shouldApplyProps, findGameObjectsByName } from './util'
  import { onSceneEvent } from './onSceneEvent'
  import { onGameEvent } from './onGameEvent'

  import Alpha from './phaser-components/Alpha.svelte'
  import Flip from './phaser-components/Flip.svelte'
  import Tint from './phaser-components/Tint.svelte'
  import Origin from './phaser-components/Origin.svelte'
  import Visible from './phaser-components/Visible.svelte'

  /**
   * The Camera alpha value. Setting this property impacts every single object that this Camera renders.
   *
   * #phaserDefault 1
   * @type {number}
   */
  export let alpha = undefined

  /**
   * The alpha value starting from the bottom-left.
   * This value is interpolated from the corner to the center.
   * @type {number}
   */
  export let alphaBottomLeft = undefined

  /**
   * The alpha value starting from the bottom-right.
   * This value is interpolated from the corner to the center.
   * @type {string}
   */
  export let alphaBottomRight = undefined

  /**
   * The alpha value starting from the top-left.
   * This value is interpolated from the corner to the cente.
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
   * The background color of this Camera. Only used if transparent is false.
   * @type {Phaser.Display.Color}
   */
  export let backgroundColor = undefined

  /**
   * Set the bounds of the Camera. The bounds are an axis-aligned rectangle.
   *
   * The Camera bounds controls where the Camera can scroll to, stopping it from scrolling off the e
   * dges and into blank space. It does not limit the placement of Game Objects, or where the Camera viewport can
   * be positioned.
   *
   * If you set bounds that are smaller than the viewport it will stop the Camera from being able to scroll.
   * The bounds can be positioned where-ever you wish. By default they are from 0x0 to the canvas width x height.
   * This means that the coordinate 0x0 is the top left of the Camera bounds. However, you can position them anywhere.
   * So if you wanted a game world that was 2048x2048 in size, with 0x0 being the center of it, you can set the bounds x/y
   * to be -1024, -1024, with a width and height of 2048. Depending on your game you may find it easier for 0x0 to be the
   * top-left of the bounds, or you may wish 0x0 to be the middle.
   *
   * object should contain:
   *
   *  - x: number - The top-left x coordinate of the bounds.
   *  - y: number - The top-left y coordinate of the bounds.
   *  - width: number - The width of the bounds, in pixels.
   *  - height: number - The height of the bounds, in pixels.
   *  - centerOn: boolean (optional) - If true the Camera will automatically be centered on the new bounds.
   * @type {object}
   */
  export let bounds

  /**
   * The Camera Fade effect handler.
   * @type {Phaser.Cameras.Scene2D.Effects.Fade}
   */
  export let fadeEffect = undefined

  /**
   * The Camera Flash effect handler.
   * @type {Phaser.Cameras.Scene2D.Effects.Flash}
   */
  export let flashEffect = undefined

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
   * The game object to follow. It can be the name of a game object, or a game object
   * instance
   *
   * @type {string|Phaser.GameObject.Game}
   */
  export let follow = undefined

  /**
   * The horizontal offset while following the target
   * @type {number}
   */
  export let followOffsetX = undefined

  /**
   * The vertical offset while following the target
   * @type {number}
   */
  export let followOffsetY = undefined

  /**
   * The height of the Camera viewport, in pixels.
   * The viewport is the area into which the Camera renders.
   * Setting the viewport does not restrict where the Camera can scroll to.
   * @type {number}
   */
  export let height = undefined

  /**
   * Does this Camera allow the Game Objects it renders to receive input events?
   *
   * #phaserDefault true
   * @type {boolean}
   */
  export let inputEnabled = undefined

  /**
   * Sets the linear interpolation value to use when following a target.
   *
   * The default values of 1 means the camera will instantly snap to the target coordinates.
   * A lower value, such as 0.1 means the camera will more slowly track the target, giving a
   * smooth transition. You can set the horizontal and vertical values independently, and also adjust this value in real-time during your game.
   *
   * Be sure to keep the value between 0 and 1. A value of zero will disable tracking on that axis.
   *
   * @type {number}
   */
  export let lerp = undefined

  /**
   * Sets lerp on X
   * @type {number}
   */
  export let lerpX = undefined

  /**
   * Sets lerp on Y
   * @type {number}
   */
  export let lerpY = undefined

  /**
   * The Mask this Camera is using during render.
   * @type {Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask}
   */
  export let mask = undefined

  /**
   * Makes this the main camera for the scene
   * @type {boolean}
   */
  export let makeMain = true

  /**
   * The name of the Camera. This is for your own use.
   * @type {string}
   */
  export let name = undefined

  /**
   * The horizontal origin of rotation for this Camera.
   *
   * By default the camera rotates around the center of the viewport.
   *
   * Changing the origin allows you to adjust the point in the viewport
   * from which rotation happens. A value of 0 would rotate from the
   * top-left of the viewport. A value of 1 from the bottom right.
   *
   * #phaserDefault 0.5
   * @type {number}
   */
  export let originX = undefined

  /**
   * The vertical origin of rotation for this Camera.
   *
   * By default the camera rotates around the center of the viewport.
   *
   * Changing the origin allows you to adjust the point in the viewport
   * from which rotation happens. A value of 0 would rotate from the
   * top-left of the viewport. A value of 1 from the bottom right.
   *
   * #phaserDefault 0.5
   * @type {number}
   */
  export let originY = undefined

  /**
   * The Camera Pan effect handler.
   * @type {Phaser.Cameras.Scene2D.Effects.Pan}
   */
  export let panEffect = undefined

  /**
   * Should this camera round its pixel values to integers?
   * @type {boolean}
   */
  export let roundPixels = undefined

  /**
   * The horizontal scroll position of this Camera.
   *
   * Change this value to cause the Camera to scroll around your Scene.
   *
   * Alternatively, setting the Camera to follow a Game Object will automatically
   * adjust the Camera scroll values accordingly.
   *
   * @type {number}
   */
  export let scrollX = undefined

  /**
   * The vertical scroll position of this Camera.
   *
   * Change this value to cause the Camera to scroll around your Scene.
   *
   * Alternatively, setting the Camera to follow a Game Object will automatically
   * adjust the Camera scroll values accordingly.
   *
   * @type {number}
   */
  export let scrollY = undefined

  /**
   * The Camera Shake effect handler.
   * @type {Phaser.Cameras.Scene2D.Effects.Shake}
   */
  export let shakeEffect = undefined

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
   * Does this Camera have a transparent background?
   *
   * #phaserDefault true
   * @type {boolean}
   */
  export let transparent = undefined

  /**
   * Is this Camera visible or not?
   *
   * A visible camera will render and perform input tests.
   * An invisible camera will not render anything and will skip input tests.
   *
   * #phaserDefault true
   * @type {boolean}
   */
  export let visible = undefined

  /**
   * The Camera zoom value. Change this value to zoom in, or out of, a Scene.
   *
   * A value of 0.5 would zoom the Camera out, so you can now see twice as
   * much of the Scene as before. A value of 2 would zoom the Camera in,
   * so every pixel now takes up 2 pixels when rendered.
   *
   * Set to 1 to return to the default zoom level.
   *
   * Be careful to never set this value to zero.
   *
   * #phaserDefault 1
   * @type {number}
   */
  export let zoom = undefined

  /**
   * The Camera Zoom effect handler.
   * @type {Phaser.Cameras.Scene2D.Effects.Zoom}
   */
  export let zoomEffect = undefined

  /**
   * The width of the Camera viewport, in pixels.
   *
   * The viewport is the area into which the Camera renders.
   * Setting the viewport does not restrict where the Camera can scroll to.
   * @type {number}
   */
  export let width

  /**
   * The x position of the Camera, relative to the top-left of the game canvas.
   *
   * This is only used when creating the camera. See the `scrollX` prop
   * for moving it.
   * @type {number}
   */
  export let x

  /**
   * The y position of the Camera, relative to the top-left of the game canvas.
   *
   * This is only used when creating the camera. See the `scrollY` prop
   * for moving it.
   *
   * @type {number}
   */
  export let y

  export let instance = new Phaser.Cameras.Scene2D.Camera(x, y, width, height)

  const scene = getScene()
  setContext('phaser/camera', instance)

  // by using the Camera component we are opting-in to controlling the camera
  // ourselves, so we will destroy the one that came with the Scene
  if (scene.cameras.main.__isOriginalCamera) {
    const oldCamera = scene.cameras.main
    scene.cameras.remove(oldCamera)
    oldCamera.destroy()
  }

  scene.cameras.addExisting(instance, makeMain)

  $: if (shouldApplyProps(follow)) {
    const target =
      typeof follow === 'string'
        ? findGameObjectsByName(scene, follow)[0]
        : follow

    if (target) {
      const _lerp = lerp || { x: lerpX, y: lerpY }

      // we need to set roundPixels etc. in startFollow otherwise they get overwritten by defaults inside
      // the startFollow method
      instance.startFollow(
        target,
        roundPixels,
        _lerp.x,
        _lerp.y,
        followOffsetX,
        followOffsetY
      )
    }
  }

  $: shouldApplyProps(backgroundColor) &&
    instance.setBackgroundColor(backgroundColor)

  $: if (shouldApplyProps(bounds)) {
    instance.setBounds(
      bounds.x,
      bounds.y,
      bounds.width,
      bounds.height,
      bounds.centerOn
    )
  }

  $: shouldApplyProps(fadeEffect) && (instance.fadeEffect = fadeEffect)
  $: shouldApplyProps(flashEffect) && (instance.flashEffect = flashEffect)

  $: if (shouldApplyProps(followOffsetX, followOffsetY)) {
    instance.setFollowOffset(followOffsetX, followOffsetY)
  }

  $: shouldApplyProps(height) && (instance.height = height)

  $: shouldApplyProps(inputEnabled) && (instance.inputEnabled = inputEnabled)

  $: if (shouldApplyProps(lerp)) {
    instance.setLerp(lerp, lerp)
  } else if (shouldApplyProps(lerpX, lerpY)) {
    instance.setLerp(lerpX, lerpY)
  }

  $: shouldApplyProps(name) && instance.setName(name)

  $: shouldApplyProps(panEffect) && (instance.panEffect = panEffect)

  $: shouldApplyProps(roundPixels) && (instance.roundPixels = roundPixels)

  $: if (shouldApplyProps(scrollX, scrollY)) {
    instance.setScroll(scrollX, scrollY)
  }

  $: shouldApplyProps(shakeEffect) && (instance.shakeEffect = shakeEffect)

  $: shouldApplyProps(transparent) && (instance.transparent = transparent)

  $: shouldApplyProps(zoom) && instance.setZoom(zoom)
  $: shouldApplyProps(zoomEffect) && (instance.zoomEffect = zoomEffect)

  onSceneEvent('CHILD_ADDED', object => {
    if (object.name) {
      if (typeof follow === 'string' && follow === object.name) {
        // trigger reactive statements on follow
        follow = follow
      } else if (follow.target === object.name) {
        follow = {
          ...follow,
        }
      }
    }
  })

  onGameEvent('prestep', () => {
    backgroundColor = instance.backgroundColor
    followOffsetX = instance.followOffset.x
    followOffsetY = instance.followOffset.y
    inputEnabled = instance.inputEnabled
    lerpX = instance.lerp.x
    lerpY = instance.lerp.y
    height = instance.height
    mask = instance.mask
    name = instance.name
    roundPixels = instance.roundPixels
    scrollX = instance.scrollX
    scrollY = instance.scrollY
    transparent = instance.transparent
    width = instance.width
    zoom = instance.zoom
  })
</script>

<svelte:options immutable />

<Alpha
  gameObject={instance}
  bind:alpha
  bind:alphaTopLeft
  bind:alphaTopRight
  bind:alphaBottomLeft
  bind:alphaBottomRight />
<Flip gameObject={instance} bind:flipX bind:flipY />
<Tint
  gameObject={instance}
  bind:tintTopLeft
  bind:tintTopRight
  bind:tintBottomLeft
  bind:tintBottomRight
  bind:tintFill />
<Origin gameObject={instance} bind:originX bind:originY />
<Visible gameObject={instance} bind:visible />

<slot />
