<script>
  import Phaser from 'phaser'
  import { Game, Scene, Text, Spawner } from 'svelte-phaser'
  import fragment from 'svelte-fragment'

  import LoadingBar from './LoadingBar.svelte'
  import Background from './Background.svelte'
  import Player from './Player.svelte'
  import Enemies from './Enemies.svelte'
  import UI from './UI.svelte'
  import { lives } from './store'

  let game

  $: window.game = game

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

<style>
  :global(body) {
    margin: 0;
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>

<Game
  bind:instance={game}
  width={800}
  height={600}
  physics={{ default: 'arcade' }}
  scale={{ mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }}>
  <Scene key="main" {preload} {create}>
    <template use:fragment slot="loading" let:progress>
      <LoadingBar x={400} y={300} {progress} />
    </template>

    <Spawner>
      <Background />
      <Enemies />
      {#if $lives > 0}
        <Player x={300} y={500} />
      {/if}
      <UI />
    </Spawner>
  </Scene>
</Game>
