<script>
  import Phaser from 'phaser'
  import { Game, Scene, Text } from 'svelte-phaser'

  let game

  $: {
    window.game = game
  }
</script>

<Game bind:instance={game}>
  <Scene key="main">
    <Text x={100} y={100} text="hello world" style={{ color: 'white' }} />
  </Scene>
</Game>
