<script>
  import { Sprite, ArcadePhysics, ArcadeCollider } from 'svelte-phaser'

  export let x
  export let y
  export let depth
</script>

<Sprite name="ball" {x} {y} {depth} texture="textures/ball">
  <ArcadePhysics bounce={1} collideWorldBounds />
  <ArcadeCollider with="ground" />
</Sprite>
