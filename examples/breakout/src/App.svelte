<script>
  import Phaser from 'phaser'
  import fragment from 'svelte-fragment'
  import { Game, Scene, Text } from 'svelte-phaser'
  import Breakout from './Breakout.svelte'

  function preload(scene) {
    scene.load.atlas('assets', 'assets/breakout.png', 'assets/breakout.json')
  }
</script>

<Game
  width={800}
  height={800}
  physics={{ default: 'arcade' }}
  scale={{ mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }}>
  <Scene key="main" {preload}>
    <template use:fragment slot="loading" let:progress>
      <Text
        x={100}
        y={100}
        text={`Loading... ${progress * 100}%`}
        color="white" />
    </template>

    <Breakout />
  </Scene>
</Game>
