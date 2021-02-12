<script lang="ts">
  import { TileSprite, onGameEvent } from 'svelte-phaser'

  let tilePositionY: number = 0

  onGameEvent('step', () => {
    tilePositionY -= 2
  })
</script>

<TileSprite
  depth={-1}
  x={0}
  y={0}
  width={800}
  height={600}
  originX={0}
  originY={0}
  texture="textures/starfield"
  {tilePositionY}
/>
