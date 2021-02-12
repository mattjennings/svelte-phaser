<script lang="ts">
  import { onMount } from 'svelte'
  import {
    Sprite,
    ArcadePhysics,
    ArcadeCollider,
    getScene,
  } from 'svelte-phaser'
  import Explosion from './Explosion.svelte'

  export let name: string
  export let target: string
  export let texture: string
  export let depth = 0
  export let x: number
  export let y: number
  export let velocityX = 0
  export let velocityY = 0
  export let onDestroy: () => any

  let instance: Phaser.Physics.Arcade.Sprite
  let destroyed = false
  let destroyedPosition: { x: number; y: number }

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
    on:animationcomplete={() => onDestroy()}
  />
{:else}
  <Sprite bind:instance {depth} {name} {texture} {x} {y}>
    <ArcadeCollider
      with={target}
      overlapOnly
      on:collide={() => {
        destroyed = true
        destroyedPosition = { x: instance.x, y: instance.y }
      }}
    />
    <ArcadePhysics {velocityY} {velocityX} />
  </Sprite>
{/if}
