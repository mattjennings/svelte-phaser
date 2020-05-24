# Grid

Renders a grid.

# Usage

```example
<script>
  import { Game, Scene, Grid } from 'svelte-phaser'
</script>

<Game width={400} height={400}>
  <Scene key="main">
    <Grid
      x={0}
      y={0}
      width={400}
      height={400}
      originX={0}
      originY={0}
      cellHeight={32}
      cellWidth={32}
      fillColor={0x333333}
      outlineFillColor={0xbbbbbb} />
  </Scene>

</Game>
```

## Properties

```properties
./../packages/svelte-phaser/src/Grid.svelte
```
