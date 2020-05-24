# Curve

Renders a curve.

# Usage

```example
<script>
  import Phaser from 'phaser'
  import { Game, Scene, Curve } from 'svelte-phaser'
</script>

<Game width={400} height={400}>
  <Scene key="main">
    <Curve
      x={200}
      y={200}
      curve={new Phaser.Curves.CubicBezier(
        { x: 0, y: 300},
        { x: 100, y: 100},
        { x: 200, y: 100},
        { x: 300, y: 300},
        )
      }
      fillColor={0x00aa00}
      strokeColor={0xff0000}
      strokeWidth={4} />
  </Scene>
</Game>
```

## Properties

```properties
./../packages/svelte-phaser/src/Curve.svelte
```
