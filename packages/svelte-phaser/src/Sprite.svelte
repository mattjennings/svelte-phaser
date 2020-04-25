<script>
  import Phaser from 'phaser'
  import { onMount, getContext } from 'svelte'
  import { addInstance } from './util'

  const scene = getContext('phaser/scene')

  export let x
  export let y
  export let texture
  export let frame
  export let animation

  export let instance = new Phaser.GameObjects.Sprite(
    scene,
    x,
    y,
    texture,
    frame
  )

  if (!scene.children.exists(instance)) {
    addInstance(instance)
    onMount(() => () => instance.destroy())
  }

  $: x !== undefined && instance.setX(x)
  $: y !== undefined && instance.setY(y)
  $: texture !== undefined && instance.setTexture(texture)
  $: frame !== undefined && instance.setFrame(frame)
  $: {
    if (animation !== undefined) {
      const ignoreIfPlaying =
        instance.anims.currentAnim &&
        instance.anims.currentAnim.key === animation
      instance.anims.play(animation, ignoreIfPlaying, 0)
    }
  }
</script>

<slot />
