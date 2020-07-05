<script>
  import Phaser from 'phaser'
  import { Game, Scene, SceneRouter } from 'svelte-phaser'
  import Preload from './scenes/Preload.svelte'
  import Battle from './scenes/Battle.svelte'
  import WorldMap from './scenes/WorldMap.svelte'

  let game
  let uiEl
  let canvas
  let style

  $: window.game = game

  $: style = canvas && canvas.style

  $: window.addEventListener('resize', () => {
    setTimeout(() => {
      style = canvas.style
    })
  })
</script>

<style>
  :global(body) {
    margin: 0;
    position: relative;
    width: 100%;
    height: 100%;
  }

  main {
    position: relative;
  }

  .ui {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>

<main>
  <canvas bind:this={canvas} />
  <div
    class="ui"
    bind:this={uiEl}
    style={style && `margin-left: ${style.marginLeft}; margin-top: ${style.marginTop}; width: ${style.width}; height: ${style.height}`}>
    {#if canvas}
      <Game
        {canvas}
        bind:instance={game}
        width={340}
        height={244}
        type={Phaser.CANVAS}
        render={{ pixelArt: true }}
        physics={{ default: 'arcade' }}
        scale={{ mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }}>
        <SceneRouter initial="Preload" scenes={{ Preload, WorldMap, Battle }} />

      </Game>
    {/if}
  </div>
</main>
