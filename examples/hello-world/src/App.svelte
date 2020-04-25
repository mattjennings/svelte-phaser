<script>
  import { Game, Scene, Text } from 'svelte-phaser'

  let game

  $: {
    window.game = game
  }
</script>

<Game bind:instance={game}>
  <Scene key="main">
    <Text x={400} y={300} text="Hello World!" style={{ color: 'white' }} />
  </Scene>
</Game>
