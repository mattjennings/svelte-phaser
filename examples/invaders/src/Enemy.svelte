<script lang="ts">
  import { Sprite, ArcadePhysics, ArcadeCollider } from 'svelte-phaser'

  export let x: number
  export let y: number
  export let velocityX: number
  export let onDie: () => any
</script>

<Sprite name="enemy" {x} {y} animation="anims/enemy/fly">
  <ArcadePhysics {velocityX} collideWorldBounds />
  <ArcadeCollider with="playerBullet" overlapOnly on:collide={onDie} />
</Sprite>
