<script>
  import Phaser from 'phaser'
  import { getContext, setContext } from 'svelte'
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
  game.scene.add(key, instance, true)

  let loading = false
  let loadingProgress = 0

  instance.load.on('progress', progress => {
    loadingProgress = progress
  })

  instance.load.on('complete', () => {
    loading = false
    loadingProgress = false
  })
</script>

{#if loading}
  <slot name="loading" progress={loadingProgress} />
{:else}
  <slot />
{/if}
