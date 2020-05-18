<script>
  import { Sprite, ArcadePhysics, ArcadeCollider } from 'svelte-phaser'

  export let x
  export let y
  export let depth
  export let bounce = 1
</script>

<Sprite name="ball" {x} {y} {depth} texture="textures/ball">
  <ArcadePhysics {bounce} collideWorldBounds circle={{ radius: 15 }} />
  <ArcadeCollider with="ground" />
</Sprite>
