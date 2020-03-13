<script>
  import Phaser from 'phaser'
  import { getContext, setContext } from 'svelte'
  import { removeUndefined } from './util'
  const game = getContext('phaser/game')

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

  export let scene = new Phaser.Scene(
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
  setContext('phaser/scene', scene)

  game.scene.add(key, scene, true)
</script>

<slot />
