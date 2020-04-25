<script>
  import { Image, ArcadePhysics, ArcadeCollider } from 'svelte-phaser'

  export let x
  export let y
  export let frame
  export let onBallHit
</script>

<Image name="block" {x} {y} texture="assets" {frame}>
  <ArcadePhysics immovable bodyType="static" />
  <ArcadeCollider with="ball" on:collide={onBallHit} />
</Image>
