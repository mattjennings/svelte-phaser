<script>
  import { Image, ArcadePhysics, onInputEvent } from 'svelte-phaser'

  export let x
  export let y
  export let instance = undefined

  onInputEvent('pointermove', pointer => {
    x = pointer.x
  })
</script>

<Image bind:instance name="paddle" {x} {y} texture="assets" frame="paddle1">
  <ArcadePhysics immovable />
</Image>
