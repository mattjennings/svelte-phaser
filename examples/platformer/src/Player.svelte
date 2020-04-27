<script>
  import { Sprite, ArcadePhysics, getScene, onGameEvent } from 'svelte-phaser'

  export let x
  export let y

  let flipX = false
  let velocityX = 0
  let velocityY = 0
  let animation = 'idle'

  let instance

  const scene = getScene()
  const X_SPEED = 100
  const keys = {
    left: scene.input.keyboard.addKey('left'),
    right: scene.input.keyboard.addKey('right'),
    up: scene.input.keyboard.addKey('up'),
    jump: scene.input.keyboard.addKey('SPACE'),
  }

  // handle key inputs
  onGameEvent('step', () => {
    if (
      (!keys.left.isDown && !keys.right.isDown) ||
      (keys.left.isDown && keys.right.isDown)
    ) {
      velocityX = 0
      animation = 'idle'
    } else if (keys.left.isDown) {
      velocityX = -X_SPEED
      flipX = true
      animation = 'run'
    } else if (keys.right.isDown) {
      flipX = false
      animation = 'run'
      velocityX = X_SPEED
    }
  })
</script>

<Sprite bind:instance {x} {y} animation={`anims/player/${animation}`} {flipX}>
  <ArcadePhysics immovable collideWorldBounds {velocityX} {velocityY} />
</Sprite>
