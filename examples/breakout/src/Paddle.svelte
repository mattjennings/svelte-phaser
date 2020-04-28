<script>
  import { Sprite, ArcadePhysics, onInputEvent } from 'svelte-phaser'

  export let x
  export let y
  export let instance = undefined

  onInputEvent('pointermove', pointer => {
    x = pointer.x
  })
</script>

<Sprite bind:instance name="paddle" bind:x {y} texture="assets" frame="paddle1">
  <ArcadePhysics immovable />
</Sprite>
