<script>
  import Phaser from 'phaser'
  import { setContext } from 'svelte'
  import { removeUndefined } from './util'

  export let audio = undefined
  export let autoFocus = undefined
  export let backgroundColor = undefined
  export let banner = undefined
  export let canvas = undefined
  export let context = undefined
  export let customEnvironment = false
  export let disableContextMenu = undefined
  export let fps = undefined
  export let height = undefined
  export let images = undefined
  export let loader = undefined
  export let physics = undefined
  export let plugins = undefined
  export let render = undefined
  export let resolution = undefined
  export let scale = undefined
  export let seed = undefined
  export let title = undefined
  export let transparent = undefined
  export let type = Phaser.AUTO
  export let url = undefined
  export let version = undefined
  export let width = undefined
  export let zoom = undefined

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
    })
  )

  let booting = true

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
