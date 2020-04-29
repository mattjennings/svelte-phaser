<script>
  import Phaser from 'phaser'
  import { Game, Scene, Text, Sprite, Camera } from 'svelte-phaser'
  import fragment from 'svelte-fragment'
  import Player from './Player.svelte'

  let game

  $: window.game = game

  function preload(scene) {
    scene.load.image('textures/bg', '/assets/level.png')
    scene.load.spritesheet('textures/player', '/assets/adventurer.png', {
      frameWidth: 50,
      frameHeight: 37,
    })
  }

  function create(scene) {
    scene.anims.create({
      key: 'anims/player/idle',
      frames: scene.anims.generateFrameNumbers('textures/player', {
        start: 0,
        end: 3,
      }),
      frameRate: 6,
      repeat: -1,
    })
    scene.anims.create({
      key: 'anims/player/run',
      frames: scene.anims.generateFrameNumbers('textures/player', {
        start: 8,
        end: 13,
      }),
      frameRate: 8,
      repeat: -1,
    })
    scene.anims.create({
      key: 'anims/player/jump',
      frames: scene.anims.generateFrameNumbers('textures/player', {
        start: 14,
        end: 21,
      }),
      frameRate: 20,
    })
    scene.anims.create({
      key: 'anims/player/fall',
      frames: scene.anims.generateFrameNumbers('textures/player', {
        start: 22,
        end: 23,
      }),
      frameRate: 10,
      repeat: -1,
    })
  }
</script>

<Game
  bind:instance={game}
  width={256}
  height={224}
  physics={{ default: 'arcade', arcade: { gravity: { y: 800 } } }}
  render={{ pixelArt: true }}
  scale={{ mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }}>
  <Scene
    key="main"
    physics={{ arcade: { width: 512, height: 256 } }}
    {preload}
    {create}>
    <template use:fragment slot="loading" let:progress>
      <Text
        x={100}
        y={100}
        text={`Loading... ${progress * 100}%`}
        color="white" />
    </template>

    <Camera
      x={0}
      y={0}
      width={256}
      height={224}
      follow="player"
      roundPixels
      bounds={{ x: 0, y: 0, width: 512, height: 256 }}>
      <Sprite texture="textures/bg" x={0} y={0} originX={0} originY={0} />
      <Player x={124} y={124} />
    </Camera>
  </Scene>
</Game>