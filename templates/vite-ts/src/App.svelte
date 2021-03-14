<script lang="ts">
  import Phaser from 'phaser'
  import { Game, Scene, Text } from 'svelte-phaser'

  let message: string = 'svelte-phaser with vite'
</script>

<Game
  width={400}
  height={400}
  scale={{ mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }}
>
  <Scene key="main">
    <Text x={80} y={150} text={message} color="white" />
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
