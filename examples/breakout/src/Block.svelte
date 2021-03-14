<script lang="ts">
  import { Sprite, ArcadePhysics, ArcadeCollider } from 'svelte-phaser'

  export let x: number
  export let y: number
  export let frame: string
</script>

<Sprite name="block" {x} {y} texture="assets" {frame}>
  <ArcadePhysics immovable bodyType="static" />
  <ArcadeCollider with="ball" on:collide />
</Sprite>
