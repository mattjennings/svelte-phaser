<script>
  import Phaser from 'phaser'
  import { getContext, setContext, onMount, tick } from 'svelte'
  import { removeUndefined } from './util'

  export let key = undefined
  export let active = undefined
  export let visible = undefined
  export let pack = undefined
  export let cameras = undefined
  export let map = undefined
  export let mapAdd = undefined
  export let physics = undefined
  export let loader = undefined
  export let plugins = undefined
  export let preload = undefined
  export let create = undefined
  export let init = undefined

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

  instance.preload = preload ? () => preload(instance) : null
  instance.create = create ? () => create(instance) : null
  instance.init = init ? () => init(instance) : null

  game.scene.add(key, instance, true)

  let loading = !!preload
  let loadingProgress = 0
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
  $: {
    if (!loading) {
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
  }
</script>

{#if loading}
  <slot name="loading" progress={loadingProgress} />
{:else}
  <slot />
{/if}
