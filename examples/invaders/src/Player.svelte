<script>
  import Phaser from 'phaser'
  import {
    Image,
    ArcadePhysics,
    ArcadeCollider,
    getScene,
    getSpawner,
    onGameEvent,
  } from 'svelte-phaser'
  import PlayerBullet from './PlayerBullet.svelte'
  import { lives } from './store'

  export let x
  export let y
  export let instance

  const { spawn } = getSpawner()
  const scene = getScene()
  const X_SPEED = 200
  const keys = {
    left: scene.input.keyboard.addKey('left'),
    right: scene.input.keyboard.addKey('right'),
    up: scene.input.keyboard.addKey('up'),
    shoot: scene.input.keyboard.addKey('SPACE'),
  }

  let velocityX = 0

  // handle key inputs
  onGameEvent('step', () => {
    if (
      (!keys.left.isDown && !keys.right.isDown) ||
      (keys.left.isDown && keys.right.isDown)
    ) {
      velocityX = 0
    } else if (keys.left.isDown) {
      velocityX = -X_SPEED
    } else if (keys.right.isDown) {
      velocityX = X_SPEED
    }

    if (Phaser.Input.Keyboard.JustDown(keys.shoot)) {
      spawn(PlayerBullet, {
        x: instance.x,
        y: instance.y - 8,
        velocityY: -300,
      })
    }
  })
</script>

<Image bind:instance depth={10} name="player" texture="textures/player" {x} {y}>
  <ArcadeCollider
    with={['enemies', 'enemyBullet']}
    overlapOnly
    on:collide={() => lives.update(prev => prev - 1)} />
  <ArcadePhysics {velocityX} collideWorldBounds />
</Image>
