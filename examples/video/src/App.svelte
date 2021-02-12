<script>
  import Phaser from 'phaser'
  import { Game, Scene, Video } from 'svelte-phaser'
  import LoadingBar from './LoadingBar.svelte'
</script>

<Game
  width={800}
  height={600}
  scale={{ mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }}
>
  <Scene key="main" let:progress>
    <slot slot="loading">
      <LoadingBar x={128} y={112} {progress} />
    </slot>
    <Video
      x={0}
      y={0}
      play
      originX={0}
      originY={0}
      load={{
        url: 'assets/wormhole.mp4',
        noAudio: true,
      }}
    />
  </Scene>
</Game>

<style>
  :global(body) {
    margin: 0;
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
