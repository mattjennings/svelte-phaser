<script lang="ts">
  import { Sprite, ArcadePhysics, onInputEvent } from 'svelte-phaser'

  export let x: number
  export let y: number
  export let instance: Phaser.Physics.Arcade.Sprite = undefined

  onInputEvent('pointermove', (pointer) => {
    x = pointer.x
  })
</script>

<Sprite bind:instance name="paddle" bind:x {y} texture="assets" frame="paddle1">
  <ArcadePhysics immovable />
</Sprite>
