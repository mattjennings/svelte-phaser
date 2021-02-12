<script>
  import Phaser from 'phaser'
  import { Game, Scene, Text } from 'svelte-phaser'
</script>

<Game
  width={400}
  height={400}
  scale={{ mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }}
>
  <Scene key="main">
    <Text x={80} y={150} text="svelte-phaser with svite" color="white" />
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
