<script>
  import Phaser from 'phaser'
  import { onMount, setContext } from 'svelte'
  import { getScene } from './getScene'

  export let name
  export let tilesets = []

  const scene = getScene()

  export let instance = scene.make.tilemap({ key: name })

  setContext('phaser/tilemap', instance)
  onMount(() => () => {
    instance.destroy()
  })

  tilesets.forEach(({ name, key }) => instance.addTilesetImage(name, key))
</script>

<slot />
