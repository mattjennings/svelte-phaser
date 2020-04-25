<script>
  import Phaser from 'phaser'
  import { Game, Scene, Text, ArcadeSprite } from 'svelte-phaser'
  import fragment from 'svelte-fragment'

  let game
  let vel = 40
  $: {
    window.game = game
  }

  function preload(scene) {
    scene.load.image('ship', 'assets/ship.png')
  }

  setInterval(() => {
    vel = -vel
  }, 2000)

  let array = Array.from({ length: 400 }).map((_, index) => {
    const columns = 10
    const column = index % columns
    const row = Math.floor(index / columns)

    return {
      x: column * 52,
      y: row * 32,
      key: index,
    }
  })
</script>

<Game bind:instance={game} physics={{ default: 'arcade' }}>
  <Scene key="main" {preload}>
    <template use:fragment slot="loading" let:progress>
      <Text
        x={100}
        y={100}
        text={`Loading... ${progress * 100}%`}
        style={{ color: 'white' }} />
    </template>

    {#each array as item, i}
      <ArcadeSprite
        x={100 + item.x}
        y={70 + item.y}
        texture="ship"
        velocityX={vel} />
    {/each}
  </Scene>
</Game>
