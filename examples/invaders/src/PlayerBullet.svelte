<script>
  import Phaser from 'phaser'
  import { onMount } from 'svelte'
  import {
    Image,
    ArcadePhysics,
    ArcadeCollider,
    getScene,
    onGameEvent,
  } from 'svelte-phaser'

  export let x
  export let y
  export let velocityY
  export let onDestroy

  const scene = getScene()

  let destroyTimer = scene.time.addEvent({
    callback: onDestroy,
    delay: 3000,
  })

  onMount(() => () => destroyTimer.destroy())
</script>

<Image depth={10} name="playerBullet" texture="textures/player/bullet" {x} {y}>
  <ArcadeCollider with={'enemy'} overlapOnly />
  <ArcadePhysics {velocityY} />
</Image>
