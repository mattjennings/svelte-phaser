<script>
  import Phaser from 'phaser'
  import { Game, Scene } from 'svelte-phaser'

  let game

  $: {
    window.game = game
  }
</script>

<Game bind:instance={game}>
  <Scene key="main" />
</Game>
