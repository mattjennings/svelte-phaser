<script lang="ts">
  import Phaser from 'phaser'
  import {
    getContext,
    setContext,
    onMount,
    tick,
    createEventDispatcher,
  } from 'svelte'
  import { createPhaserEventDispatcher, removeUndefined } from './util'
  import { getGame } from './getGame'

  const dispatch = createEventDispatcher()

  /**
   * The unique key of this Scene. Must be unique within the entire Game instance.
   *
   * #required
   * @type {string}
   */
  export let key: string = undefined

  /**
   * Does the Scene start as active or not? An active Scene updates each step.
   * @type {boolean}
   */
  export let active: boolean = undefined

  /**
   * Does the Scene start as visible or not? A visible Scene renders each step.
   * @type {boolean}
   */
  export let visible: boolean = undefined

  /**
   * An optional Loader Packfile to be loaded before the Scene begins.
   * @type {false | Phaser.Types.Loader.FileTypes.PackFileConfig}
   */
  export let pack:
    | false
    | Phaser.Types.Loader.FileTypes.PackFileConfig = undefined

  /**
   * An optional Camera configuration object.
   * @type {Phaser.Types.Cameras.Scene2D.JSONCamera | Phaser.Types.Cameras.Scene2D.JSONCamera[]}
   */
  export let cameras:
    | Phaser.Types.Cameras.Scene2D.JSONCamera
    | Phaser.Types.Cameras.Scene2D.JSONCamera[] = undefined

  /**
   * Overwrites the default injection map for a scene.
   * @type {object}
   */
  export let map: any = undefined

  /**
   * Extends the injection map for a scene.
   * @type {object}
   */
  export let mapAdd: any = undefined

  /**
   * The physics configuration object for the Scene.
   * @type {Phaser.Types.Core.PhysicsConfig}
   */
  export let physics: Phaser.Types.Core.PhysicsConfig = undefined

  /**
   * The loader configuration object for the Scene.
   * @type {Phaser.Types.Core.LoaderConfig}
   */
  export let loader: Phaser.Types.Core.LoaderConfig = undefined

  /**
   * The plugin configuration object for the Scene.
   * @type {any}
   */
  export let plugins: any = undefined

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
  export let preload: (scene: Phaser.Scene) => any = undefined

  /**
   * Use this callback to create any other assets needed by the scene (animations, etc).
   *
   * This method is called by the Scene Manager when the scene starts, after init() and preload().
   * If the LoaderPlugin started after preload(), then this method is called only after loading is complete.
   *
   * It is called with the Phaser.Scene instance as the parameter.
   * @type {function}
   */
  export let create: (scene: Phaser.Scene) => any = undefined

  /**
   * Called with the Scene Manager update loop
   *
   * @type {function}
   */
  export let update: (scene: Phaser.Scene) => any = undefined

  /**
   * This method is called by the Scene Manager when the scene starts,
   * before preload() and create().
   *
   * It is called with the Phaser.Scene instance as the parameter.
   * @type {function}
   */
  export let init: (scene: Phaser.Scene) => any = undefined

  export let transition: Phaser.Types.Scenes.SceneTransitionConfig = undefined

  /**
   * If you have your own Phaser.Scene instance you may pass it in
   * @type {Phaser.Scene}
   */
  export let instance: Phaser.Scene = new Phaser.Scene(
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

  const game = getGame()
  setContext('phaser/scene', instance)

  let loading = !!preload
  let loadingProgress = 0

  // @ts-ignore
  instance.preload = preload ? () => preload(instance) : null
  // @ts-ignore
  instance.create = create ? () => create(instance) : null
  // @ts-ignore
  instance.init = init ? () => init(instance) : null

  instance.update = update ? () => update(instance) : null

  game.scene.add(key, instance, true)

  let listeners = [
    instance.load.on('progress', (progress) => {
      loadingProgress = progress
    }),

    instance.load.on('complete', () => {
      loading = false
      loadingProgress = 100
    }),
  ]

  let eventListeners = [
    createPhaserEventDispatcher(
      instance.input,
      dispatch,
      'drag',
      (pointer, dragX, dragY) => ({
        pointer,
        dragX,
        dragY,
      })
    ),
    createPhaserEventDispatcher(
      instance.input,
      dispatch,
      'dragend',
      (pointer) => ({
        pointer,
      })
    ),
    createPhaserEventDispatcher(
      instance.input,
      dispatch,
      'dragenter',
      (pointer, target) => ({
        pointer,
        target,
      })
    ),
    createPhaserEventDispatcher(
      instance.input,
      dispatch,
      'dragleave',
      (pointer, target) => ({
        pointer,
        target,
      })
    ),
    createPhaserEventDispatcher(
      instance.input,
      dispatch,
      'dragover',
      (pointer, target) => ({
        pointer,
        target,
      })
    ),
    createPhaserEventDispatcher(
      instance.input,
      dispatch,
      'dragstart',
      (pointer) => ({
        pointer,
      })
    ),
    createPhaserEventDispatcher(
      instance.input,
      dispatch,
      'drop',
      (pointer, target) => ({
        pointer,

        target,
      })
    ),
    createPhaserEventDispatcher(
      instance.input,
      dispatch,
      'pointerdown',
      (pointer, localX, localY, event) => ({
        pointer,
        localX,
        localY,
        event,
      })
    ),
    createPhaserEventDispatcher(
      instance.input,
      dispatch,
      'pointermove',
      (pointer, localX, localY, event) => ({
        pointer,
        localX,
        localY,
        event,
      })
    ),
    createPhaserEventDispatcher(
      instance.input,
      dispatch,
      'pointerout',
      (pointer, event) => ({
        pointer,
        event,
      })
    ),
    createPhaserEventDispatcher(
      instance.input,
      dispatch,
      'pointerover',
      (pointer, localX, localY, event) => ({
        pointer,
        localX,
        localY,
        event,
      })
    ),
    createPhaserEventDispatcher(
      instance.input,
      dispatch,
      'pointerup',
      (pointer, localX, localY, event) => ({
        pointer,
        localX,
        localY,
        event,
      })
    ),
    createPhaserEventDispatcher(
      instance.input,
      dispatch,
      'pointerwheel',
      (pointer, deltaX, deltaY, deltaZ, event) => ({
        pointer,
        deltaX,
        deltaY,
        deltaZ,
        event,
      })
    ),
    createPhaserEventDispatcher(
      instance.events,
      dispatch,
      'transitioninit',
      (fromScene, duration) => ({ fromScene, duration })
    ),
    createPhaserEventDispatcher(
      instance.events,
      dispatch,
      'transitionstart',
      (fromScene, duration) => ({ fromScene, duration })
    ),
    createPhaserEventDispatcher(
      instance.events,
      dispatch,
      'transitionwake',
      (fromScene, duration) => ({ fromScene, duration })
    ),
    createPhaserEventDispatcher(
      instance.events,
      dispatch,
      'transitionout',
      () => ({})
    ),
    createPhaserEventDispatcher(
      instance.events,
      dispatch,
      'transitioncomplete',
      () => ({})
    ),
  ]

  onMount(() => {
    return () => {
      listeners.forEach((listener) => {
        listener.eventNames().forEach((event) => listener.off(event))
      })

      eventListeners.forEach((l) => l())

      game.scene.remove(key)
    }
  })

  $: if (!loading) {
    // indicate that this is the default camera you get with the Scene
    // @ts-ignore
    instance.cameras.main.__isOriginalCamera = true
    setContext('phaser/camera', instance.cameras.main)
  }

  $: if (transition) {
    // console.log(key, transition)
    instance.scene.transition(transition)
  }
</script>

{#if loading}
  <slot name="loading" progress={loadingProgress} />
{:else}
  <slot />
{/if}
