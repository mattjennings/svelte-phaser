<script>
  import { onMount } from 'svelte'
  import { Image, ArcadePhysics, ArcadeCollider, getScene } from 'svelte-phaser'
  import Explosion from './Explosion.svelte'

  export let x
  export let y
  export let velocityY
  export let onDestroy

  let instance
  let destroyed = false
  let destroyedPosition

  const scene = getScene()

  let destroyTimer = scene.time.addEvent({
    callback: () => {
      if (!destroyed) {
        onDestroy()
      }
    },
    delay: 3000,
  })

  onMount(() => () => destroyTimer.destroy())
</script>

{#if destroyed}
  <Explosion
    x={destroyedPosition.x}
    y={destroyedPosition.y - 32}
    onAnimationComplete={() => onDestroy()} />
{:else}
  <Image
    bind:instance
    depth={10}
    name="playerBullet"
    texture="textures/player/bullet"
    {x}
    {y}>
    <ArcadeCollider
      with={'enemy'}
      overlapOnly
      on:collide={() => {
        velocityY = 0
        destroyed = true
        destroyedPosition = { x: instance.x, y: instance.y }
      }} />
    <ArcadePhysics {velocityY} />
  </Image>
{/if}
