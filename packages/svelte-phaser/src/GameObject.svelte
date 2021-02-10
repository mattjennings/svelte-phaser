<svelte:options immutable />

<script lang="ts">
  import { getScene } from './getScene'
  import { onGameEvent } from './onGameEvent'
  import {
    shouldApplyProps,
    createPhaserEventDispatcher,
    addInstance,
  } from './util'
  import { onMount, createEventDispatcher, setContext } from 'svelte'

  /**
   * The active state of this Game Object. A Game Object with an active state of true is processed by the
   * Scenes UpdateList, if added to it. An active object is one which is having its logic and internal systems updated.
   * @type {boolean}
   */
  export let active: boolean = undefined

  /**
   * A Data Manager. It allows you to store, query and get key/value paired information specific to this Game Object. null by default.
   * @type {any}
   */
  export let data: any = undefined

  /**
   * Enables the firing of drag events
   * @type {boolean}
   */
  export let draggable: boolean = false

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
  export let interactive:
    | boolean
    | {
        shape?: Phaser.Types.Input.InputConfiguration
        callback?: Phaser.Types.Input.HitAreaCallback
        dropZone?: boolean
      } = true

  /**
   * The name of this Game Object. This is not used by Phaser, but some svelte-phaser components such as
   * ArcadeCollider will make use of names to find the reference to the Game Object.
   * @type {string}
   */
  export let name: string = undefined

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
   * The Tab Index of the Game Object. Reserved for future use by plugins and the Input Manager.
   *
   * #phaserDefault -1
   * @type {number}
   */
  export let tabIndex: number = undefined

  export let instance

  setContext('phaser/game-object', instance)

  const dispatch = createEventDispatcher()
  const scene = getScene()

  if (!scene.children.exists(instance)) {
    addInstance(instance)
  }

  const listeners = [
    createPhaserEventDispatcher(
      instance,
      dispatch,
      'drag',
      (pointer, dragX, dragY) => ({
        pointer,
        dragX,
        dragY,
      })
    ),
    createPhaserEventDispatcher(instance, dispatch, 'dragend', (pointer) => ({
      pointer,
    })),
    createPhaserEventDispatcher(
      instance,
      dispatch,
      'dragenter',
      (pointer, target) => ({
        pointer,
        target,
      })
    ),
    createPhaserEventDispatcher(
      instance,
      dispatch,
      'dragleave',
      (pointer, target) => ({
        pointer,
        target,
      })
    ),
    createPhaserEventDispatcher(
      instance,
      dispatch,
      'dragover',
      (pointer, target) => ({
        pointer,
        target,
      })
    ),
    createPhaserEventDispatcher(instance, dispatch, 'dragstart', (pointer) => ({
      pointer,
    })),
    createPhaserEventDispatcher(
      instance,
      dispatch,
      'drop',
      (pointer, target) => ({
        pointer,

        target,
      })
    ),
    createPhaserEventDispatcher(
      instance,
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
      instance,
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
      instance,
      dispatch,
      'pointerout',
      (pointer, event) => ({
        pointer,
        event,
      })
    ),
    createPhaserEventDispatcher(
      instance,
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
      instance,
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
      instance,
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
  ]

  onMount(() => () => {
    listeners.forEach((listener) => listener())
    instance.destroy()
  })

  $: shouldApplyProps(active) && instance.setActive(active)
  $: shouldApplyProps(name) && instance.setName(name)
  $: shouldApplyProps(renderFlags) && (instance.renderFlags = renderFlags)

  $: if (interactive === true) {
    instance.setInteractive()
  } else if (!interactive) {
    instance.removeInteractive()
  } else {
    instance.setInteractive(
      interactive.shape,
      interactive.callback,
      interactive.dropZone
    )
  }

  $: if (shouldApplyProps(draggable) && interactive) {
    scene.input.setDraggable(instance, draggable)
  }

  $: shouldApplyProps(tabIndex) && (instance.tabIndex = tabIndex)

  onGameEvent('prestep', () => {
    active = instance.active
    name = instance.name
    renderFlags = instance.renderFlags
    tabIndex = instance.tabIndex

    if (instance.data) {
      data = instance.data.get()
    }
  })
</script>

<slot />
