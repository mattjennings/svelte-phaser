<script>
  import Phaser from 'phaser'
  import { Game, Scene, HTML, ArcadePhysics } from 'svelte-phaser'
</script>

<div id="phaser">
  <Game
    width={800}
    height={600}
    scale={{ mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }}
    physics={{
      default: 'arcade',
      arcade: { gravity: { y: 800 } },
    }}
    parent="phaser"
    dom={{
      createContainer: true,
    }}
  >
    <Scene key="main">
      <HTML x={300} y={300}>
        <ArcadePhysics
          bounce={1}
          velocityX={200}
          collideWorldBounds
          offsetY={12}
          offsetX={4}
          angularVelocity={200}
          circle={{ radius: 35 }}
        />
        <span>🤔</span>
      </HTML>
    </Scene>
  </Game>
</div>

<style>
  :global(body) {
    margin: 0;
    position: relative;
    width: 100%;
    height: 100%;
  }

  span {
    font-size: 80px;
  }
</style>
