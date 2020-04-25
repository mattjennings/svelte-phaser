<script>
  import { Sprite, ArcadePhysics, ArcadeCollider } from 'svelte-phaser'

  export let x
  export let y
  export let velocityX
  export let onDie
</script>

<Sprite name="enemy" {x} {y} animation="anims/enemy/fly">
  <ArcadePhysics {velocityX} collideWorldBounds />
  <ArcadeCollider with="playerBullet" overlapOnly on:collide={onDie} />
</Sprite>
