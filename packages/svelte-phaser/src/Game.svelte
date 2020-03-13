<script>
  import Phaser from 'phaser'
  import { setContext } from 'svelte'
  import { removeUndefined } from './util'
  export let width = undefined
  export let height = undefined
  export let zoom = undefined
  export let resolution = undefined
  export let type = undefined
  export let customEnvironment = undefined
  export let context = undefined
  export let seed = undefined
  export let title = undefined
  export let url = undefined
  export let version = undefined
  export let autoFocus = undefined
  export let disableContextMenu = undefined
  export let transparent = undefined
  export let banner = undefined
  export let fps = undefined
  export let render = undefined
  export let backgroundColor = undefined
  export let loader = undefined
  export let images = undefined
  export let physics = undefined
  export let plugins = undefined
  export let scale = undefined
  export let audio = undefined

  export let instance = new Phaser.Game(
    removeUndefined({
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

  setContext('phaser/game', instance)

  let booting = true

  instance.events.on('ready', () => {
    booting = false
  })
</script>

{#if booting}
  <slot name="booting" />
{:else}
  <slot />
{/if}
