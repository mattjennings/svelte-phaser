<script>
  import Phaser from 'phaser'
  import { setContext, createEventDispatcher } from 'svelte'
  import { removeUndefined } from './util'
  const dispatch = createEventDispatcher()

  /**
   * Audio configuration
   * @type {Phaser.Types.Core.AudioConfig}
   */
  export let audio = undefined

  /**
   * Automatically call window.focus() when the game boots. Usually necessary to capture input events if the game is in a separate frame.
   * @type {boolean}
   */
  export let autoFocus = false

  /**
   * The background color of the game canvas. The default is black.
   * @type {string|number}
   */
  export let backgroundColor = 0x000000

  /**
   * Configuration for the banner printed in the browser console when the game starts.
   * @type {boolean|Phaser.Types.Core.BannerConfig}
   * @required
   */
  export let banner = false

  /**
   * Provide your own Canvas element for Phaser to use instead of creating one.
   * You will also need to set the type to Phaser.CANVAS
   * @type {HTMLCanvasElement}
   */
  export let canvas = null

  /**
   * Provide your own Canvas Context for Phaser to use, instead of creating one.
   * @type {CanvasRenderingContext2D}
   */
  export let context = undefined

  /**
   * Is Phaser running under a custom (non-native web) environment?
   * If so, set this to true to skip internal Feature detection.
   * If true the renderType cannot be left as AUTO.
   * @type {boolean}
   */
  export let customEnvironment = false

  /**
   * Disable the browser's default 'contextmenu' event (usually triggered by a right-button mouse click).
   * @type {boolean}
   */
  export let disableContextMenu = false

  /**
   * Game loop configuration.
   * @type {Phaser.Types.Core.FPSConfig}
   */
  export let fps = undefined

  /**
   * The height of the game, in game pixels.
   * @type {number}
   */
  export let height = 1024

  /**
   * Images configuration
   * @type {Phaser.Types.Core.ImagesConfig}
   */
  export let images = undefined

  /**
   * Loader configuration
   * @type {Phaser.Types.Core.LoaderConfig}
   */
  export let loader = undefined

  /**
   * Physics configuration
   * @type {Phaser.Types.Core.PhysicsConfig}
   */
  export let physics = undefined

  /**
   *  Plugins to install.
   * @type {Phaser.Types.Core.PluginObject | Phaser.Types.Core.PluginObjectItem[]}
   */
  export let plugins = undefined

  /**
   * Game renderer configuration.
   * @type {Phaser.Types.Core.RenderConfig}
   */
  export let render = undefined

  /**
   * The size of each game pixel, in canvas pixels. Values larger than 1 are "high" resolution.
   * @type {number}
   */
  export let resolution = 1

  /**
   * Scale configuration
   * @type {Phaser.Types.Core.ScaleConfig}
   */
  export let scale = 1

  /**
   * Seed for the random number generator.
   * @type {string[]}
   */
  export let seed = undefined

  /**
   * The title of the game. Shown in the browser console.
   * @type {string}
   */
  export let title = undefined

  /**
   *  Whether the game canvas will have a transparent background
   * @type {boolean}
   */
  export let transparent = false

  /**
   * Which renderer to use. Phaser.AUTO, Phaser.CANVAS, Phaser.HEADLESS,
   * or Phaser.WEBGL. AUTO picks WEBGL if available, otherwise CANVAS.
   * @type {number}
   */
  export let type = Phaser.AUTO

  /**
   * The URL of the game. Shown in the browser console.
   * @type {string}
   */
  export let url = undefined

  /**
   * The version of the game. Shown in the browser console.
   * @type {string}
   */
  export let version = undefined

  /**
   * The width of the game, in game pixels.
   * @type {number}
   */
  export let width = 1024

  /**
   * Simple scale applied to the game canvas. 2 is double size, 0.5 is half size, etc.
   * @type {number}
   */
  export let zoom = 1

  /**
   * If you have an existing Phaser.Game instnace you can pass it in here.
   * @type {}
   */
  export let instance = new Phaser.Game(
    removeUndefined({
      canvas,
      width,
      height,
      zoom,
      resolution,
      type,
      customEnvironment,
      context,
      seed,
      title,
      url,
      version,
      autoFocus,
      disableContextMenu,
      transparent,
      banner,
      fps,
      render,
      backgroundColor,
      loader,
      images,
      physics,
      plugins,
      scale,
      audio,
      callbacks: {
        preBoot: (...args) => dispatch('preBoot'),
        postBoot: (...args) => dispatch('postBoot'),
      },
    })
  )

  let booting = !instance.isBooted

  instance.events.on('ready', () => {
    booting = false
  })

  setContext('phaser/game', instance)
</script>

{#if booting}
  <slot name="booting" />
{:else}
  <slot />
{/if}
