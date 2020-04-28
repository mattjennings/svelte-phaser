<script>
  import { onMount } from 'svelte'
  import {
    Sprite,
    ArcadePhysics,
    ArcadeCollider,
    getScene,
  } from 'svelte-phaser'
  import Explosion from './Explosion.svelte'

  export let name
  export let target
  export let texture
  export let depth = 0
  export let x
  export let y
  export let velocityX = 0
  export let velocityY = 0
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
  <Sprite bind:instance {depth} {name} {texture} {x} {y}>
    <ArcadeCollider
      with={target}
      overlapOnly
      on:collide={() => {
        destroyed = true
        destroyedPosition = { x: instance.x, y: instance.y }
      }} />
    <ArcadePhysics {velocityY} {velocityX} />
  </Sprite>
{/if}
