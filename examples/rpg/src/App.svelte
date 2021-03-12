<script>
  import Phaser from 'phaser'
  import { Game } from 'svelte-phaser'
  import Router from './Router.svelte'
  import Preload from './scenes/Preload.svelte'

  let game
  let parent
</script>

<div bind:this={parent} class="parent">
  {#if parent}
    <Game
      bind:instance={game}
      width={340}
      height={244}
      render={{ pixelArt: true }}
      physics={{ default: 'arcade' }}
      {parent}
      dom={{
        createContainer: true,
      }}
      scale={{ mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }}
    >
      <Router initial={{ component: Preload }} />
    </Game>
  {/if}
</div>

<style>
  :global(body) {
    margin: 0;
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
