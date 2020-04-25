<script>
  import { Game, Scene, Text } from 'svelte-phaser'
  import fragment from 'svelte-fragment'
  import Invaders from './Invaders.svelte'

  let game

  $: {
    window.game = game
  }
  function preload(scene) {
    scene.load.image('textures/starfield', 'assets/starfield.png')
    scene.load.spritesheet('textures/enemy', 'assets/invader.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    scene.load.spritesheet('textures/explosion', 'assets/explode.png', {
      frameWidth: 128,
      frameHeight: 128,
    })
    scene.load.image('textures/player', 'assets/ship.png')
    scene.load.image('textures/player/bullet', 'assets/bullet.png')
    scene.load.image('textures/enemy/bullet', 'assets/enemy-bullet.png')
  }

  function create(scene) {
    scene.anims.create({
      key: 'anims/enemy/fly',
      frames: scene.anims.generateFrameNumbers('textures/enemy', {
        start: 0,
        end: 4,
      }),
      frameRate: 10,
      repeat: -1,
    })
    scene.anims.create({
      key: 'anims/explosion',
      frames: scene.anims.generateFrameNumbers('textures/explosion', {
        start: 0,
        end: 16,
      }),
      frameRate: 24,
    })
  }
</script>

<Game
  bind:instance={game}
  width={800}
  height={600}
  physics={{ default: 'arcade', arcade: { debug: true } }}>
  <Scene key="main" {preload} {create}>
    <template use:fragment slot="loading" let:progress>
      <Text
        x={100}
        y={100}
        text={`Loading... ${progress * 100}%`}
        color="white" />
    </template>

    <Invaders />
  </Scene>
</Game>
