<script lang="ts">
  import { Sprite } from 'svelte-phaser'

  export let x: number
  export let y: number
</script>

<Sprite
  {x}
  {y}
  depth={30}
  animation="anims/explosion"
  scale={0.75}
  on:animationcomplete
/>
