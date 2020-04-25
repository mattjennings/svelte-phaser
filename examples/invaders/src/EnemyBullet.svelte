<script>
  import { onMount } from 'svelte'
  import { Image, ArcadePhysics, ArcadeCollider, getScene } from 'svelte-phaser'
  import Explosion from './Explosion.svelte'

  export let x
  export let y
  export let velocityX
  export let velocityY
  export let angle
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
    name="enemyBullet"
    texture="textures/enemy/bullet"
    {x}
    {y}>
    <ArcadePhysics {velocityX} {velocityY} {angle} />
    <ArcadeCollider
      with="player"
      overlapOnly
      on:collide={() => {
        destroyed = true
        destroyedPosition = { x: instance.x, y: instance.y }
      }} />
  </Image>
{/if}
