<script>
  import { Sprite } from 'svelte-phaser'

  export let x
  export let y
  export let onAnimationComplete
</script>

<Sprite
  {x}
  {y}
  depth={30}
  animation="anims/explosion"
  scale={0.75}
  on:animationcomplete={onAnimationComplete} />
