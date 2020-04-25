<script>
  import Phaser from 'phaser'
  import { onMount, getContext } from 'svelte'
  import { addInstance } from './util'
  import Sprite from './Sprite.svelte'

  const scene = getContext('phaser/scene')

  export let x
  export let y
  export let texture
  export let frame
  export let physicsType = 'dynamic'

  export let velocity
  export let velocityX
  export let velocityY

  export let instance = new Phaser.Physics.Arcade.Sprite(
    scene,
    x,
    y,
    texture,
    frame
  )

  if (!scene.children.exists(instance)) {
    addInstance(instance)
    onMount(() => () => instance.destroy())
    scene.physics.world.enable(
      instance,
      physicsType === 'static'
        ? Phaser.Physics.Arcade.STATIC_BODY
        : Phaser.Physics.Arcade.DYNAMIC_BODY
    )
  }

  $: velocity !== undefined && instance.setVelocity(velocity)
  $: velocityX !== undefined && instance.setVelocityX(velocityX)
  $: velocityY !== undefined && instance.setVelocityY(velocityY)
</script>

<Sprite {instance} {...$$props}>
  <slot />
</Sprite>
