<script context="module">
  export function preload(scene) {
    scene.load.spritesheet('textures/player', 'assets/characters/male-1.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
  }

  export function create(scene) {
    let frameRate = 5
    scene.anims.create({
      key: 'anims/player/down',
      // the spritesheet frames are not in the expected order, so we'll customize it here
      // so that the "idle" frame is the first one
      frames: [1, 0, 1, 2].flatMap(frame =>
        scene.anims.generateFrameNumbers('textures/player', {
          start: frame,
          end: frame,
        })
      ),
      repeat: -1,
      frameRate,
    })
    scene.anims.create({
      key: 'anims/player/left',
      frames: [4, 3, 4, 5].flatMap(frame =>
        scene.anims.generateFrameNumbers('textures/player', {
          start: frame,
          end: frame,
        })
      ),
      repeat: -1,
      frameRate,
    })
    scene.anims.create({
      key: 'anims/player/right',
      frames: [7, 6, 7, 8].flatMap(frame =>
        scene.anims.generateFrameNumbers('textures/player', {
          start: frame,
          end: frame,
        })
      ),
      repeat: -1,
      frameRate,
    })
    scene.anims.create({
      key: 'anims/player/up',
      frames: [10, 9, 10, 11].flatMap(frame =>
        scene.anims.generateFrameNumbers('textures/player', {
          start: frame,
          end: frame,
        })
      ),
      repeat: -1,
      frameRate,
    })
  }
</script>

<script>
  import {
    Sprite,
    ArcadePhysics,
    ArcadeCollider,
    onGameEvent,
    getScene,
  } from 'svelte-phaser'

  export let x
  export let y
  export let velocityX
  export let velocityY

  let instance
  let animation = 'anims/player/down'
  let frameIndex = 0
  let isPlayingAnimation = true

  const scene = getScene()
  const SPEED = 100
  const keys = {
    left: scene.input.keyboard.addKey('left'),
    right: scene.input.keyboard.addKey('right'),
    up: scene.input.keyboard.addKey('up'),
    down: scene.input.keyboard.addKey('down'),
  }

  // handle key inputs
  onGameEvent('step', () => {
    if (
      (!keys.left.isDown && !keys.right.isDown) ||
      (keys.left.isDown && keys.right.isDown)
    ) {
      velocityX = 0
    } else if (keys.left.isDown) {
      velocityX = -SPEED
      animation = 'anims/player/left'
    } else if (keys.right.isDown) {
      velocityX = SPEED
      animation = 'anims/player/right'
    }

    if (
      (!keys.up.isDown && !keys.down.isDown) ||
      (keys.up.isDown && keys.down.isDown)
    ) {
      velocityY = 0
    } else if (keys.up.isDown) {
      velocityY = -SPEED
      animation = 'anims/player/up'
    } else if (keys.down.isDown) {
      velocityY = SPEED
      animation = 'anims/player/down'
    }

    if (velocityX === 0 && velocityY === 0) {
      isPlayingAnimation = false
      frameIndex = 0
    } else {
      isPlayingAnimation = true
    }
  })
</script>

<Sprite
  bind:instance
  bind:animation
  bind:x
  bind:y
  isPlaying={isPlayingAnimation}
  bind:frameIndex
  {...$$restProps}>
  <ArcadePhysics bind:velocityX bind:velocityY collideWorldBounds />
  <ArcadeCollider with={['ground', 'props']} />
</Sprite>
