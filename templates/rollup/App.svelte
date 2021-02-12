<script>
  import Phaser from 'phaser'
  import { Game, Scene, Text } from 'svelte-phaser'
</script>

<Game width={400} height={400} scale={{ autoCenter: Phaser.Scale.CENTER_BOTH }}>
  <Scene key="main">
    <Text x={130} y={150} text="svelte-phaser with rollup" color="white" />
  </Scene>
</Game>
