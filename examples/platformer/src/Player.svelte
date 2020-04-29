<script>
  import Phaser from 'phaser'
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
    } else if (keys.left.isDown) {
      velocityX = -X_SPEED
      flipX = true
    } else if (keys.right.isDown) {
      flipX = false
      velocityX = X_SPEED
    }

    if (Phaser.Input.Keyboard.JustDown(keys.jump)) {
      velocityY = -200
    } else if (Phaser.Input.Keyboard.JustUp(keys.jump) && velocityY < 0) {
      velocityY = 1
    }
  })

  $: if (velocityY === 0) {
    if (velocityX !== 0) {
      animation = 'run'
    } else {
      animation = 'idle'
    }
  }

  $: if (velocityY < 0 && animation !== 'fall') {
    animation = 'jump'
  } else if (velocityY > 0) {
    animation = 'fall'
  }

  function onAnimationComplete({ detail }) {
    if (detail.animation.key === 'anims/player/jump') {
      animation = 'fall'
    }
  }
</script>

<Sprite
  name="player"
  bind:instance
  bind:x
  bind:y
  animation={`anims/player/${animation}`}
  on:animationcomplete={onAnimationComplete}
  {flipX}>
  <ArcadePhysics immovable collideWorldBounds bind:velocityX bind:velocityY />
</Sprite>
