<script>
  import Phaser from 'phaser'
  import { Game, Scene, Text } from 'svelte-phaser'
</script>

<Game width={400} height={400} scale={{ autoCenter: Phaser.Scale.CENTER_BOTH }}>
  <Scene key="main">
    <Text x={80} y={150} text="svelte-phaser with snowpack" color="white" />
  </Scene>
</Game>
