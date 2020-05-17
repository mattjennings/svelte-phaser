<script>
  import Phaser from './phaser.js'
  import { getContext, setContext, onMount, tick } from 'svelte'
  import { removeUndefined } from './util'

  /**
   * The unique key of this Scene. Must be unique within the entire Game instance.
   *
   * #required
   * @type {string}
   */
  export let key = undefined

  /**
   * Does the Scene start as active or not? An active Scene updates each step.
   * @type {boolean}
   */
  export let active = undefined

  /**
   * Does the Scene start as visible or not? A visible Scene renders each step.
   * @type {boolean}
   */
  export let visible = undefined

  /**
   * An optional Loader Packfile to be loaded before the Scene begins.
   * @type {false | Phaser.Types.Loader.FileTypes.PackFileConfig}
   */
  export let pack = undefined

  /**
   * An optional Camera configuration object.
   * @type {Phaser.Types.Cameras.Scene2D.JSONCamera | Phaser.Types.Cameras.Scene2D.JSONCamera[]}
   */
  export let cameras = undefined

  /**
   * Overwrites the default injection map for a scene.
   * @type {object}
   */
  export let map = undefined

  /**
   * Extends the injection map for a scene.
   * @type {map}
   */
  export let mapAdd = undefined

  /**
   * The physics configuration object for the Scene.
   * @type {Phaser.Types.Core.PhysicsConfig}
   */
  export let physics = undefined

  /**
   * The loader configuration object for the Scene.
   * @type {Phaser.Types.Core.LoaderConfig}
   */
  export let loader = undefined

  /**
   * The plugin configuration object for the Scene.
   * @type {any}
   */
  export let plugins = undefined

  /**
   * Use this callback to load assets.
   *
   * This method is called by the Scene Manager, after init() and before create(), only if the Scene has a LoaderPlugin.
   * After this method completes, if the LoaderPlugin's queue isn't empty,
   * the LoaderPlugin will start automatically.
   *
   * It is called with the Phaser.Scene instance as the parameter.
   * @type {function}
   */
  export let preload = undefined

  /**
   * Use this callback to create any other assets needed by the scene (animations, etc).
   *
   * This method is called by the Scene Manager when the scene starts, after init() and preload().
   * If the LoaderPlugin started after preload(), then this method is called only after loading is complete.
   *
   * It is called with the Phaser.Scene instance as the parameter.
   * @type {function}
   */
  export let create = undefined

  /**
   * This method is called by the Scene Manager when the scene starts,
   * before preload() and create().
   *
   * It is called with the Phaser.Scene instance as the parameter.
   * @type {function}
   */
  export let init = undefined

  /**
   * If you have your own Phaser.Scene instance you may pass it in
   * @type {Phaser.Scene}
   */
  export let instance = new Phaser.Scene(
    removeUndefined({
      key,
      active,
      visible,
      pack,
      cameras,
      map,
      mapAdd,
      physics,
      loader,
      plugins,
    })
  )

  const game = getContext('phaser/game')
  setContext('phaser/scene', instance)

  let loading = !!preload
  let loadingProgress = 0

  instance.preload = preload ? () => preload(instance) : null
  instance.create = create ? () => create(instance) : null
  instance.init = init ? () => init(instance) : null

  game.scene.add(key, instance, true)

  let listeners = [
    instance.load.on('progress', progress => {
      loadingProgress = progress
    }),

    instance.load.on('complete', () => {
      loading = false
      loadingProgress = false
    }),
  ]

  onMount(() => {
    return () => {
      game.scene.remove(key)

      listeners.forEach(listener => {
        listener.eventNames().forEach(event => listener.off(event))
      })
    }
  })

  // emit our own CHILD_ADDED and CHILD_REMOVED events on the scene
  // (used for collider components)
  $: if (!loading) {
    const origAdd = instance.children.addCallback
    instance.children.addCallback = async (...args) => {
      await tick() // wait for svelte to apply props to components first

      if (origAdd) {
        origAdd(...args)
      }

      instance.events.emit('CHILD_ADDED', ...args)
    }

    const origRemove = instance.children.removeCallback
    instance.children.removeCallback = async (...args) => {
      await tick()
      if (origRemove) {
        origRemove(...args)
      }
      instance.events.emit('CHILD_REMOVED', ...args)
    }
  }

  $: if (!loading) {
    // indicate that this is the default camera you get with the Scene
    instance.cameras.main.__isOriginalCamera = true
    setContext('phaser/camera', instance.cameras.main)
  }
</script>

{#if loading}
  <slot name="loading" progress={loadingProgress} />
{:else}
  <slot />
{/if}
