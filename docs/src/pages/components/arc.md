# Arc

Renders an "arc" shape. This can be used for circles or semi-circles.

# Usage

```example
<script>
  import { Game, Scene, Arc } from 'svelte-phaser'
</script>

<Game width={400} height={400}>
  <Scene key="main">
    <Arc
      x={100}
      y={200}
      radius={50}
      fillColor={0xff0000} />
    <Arc
      x={300}
      y={200}
      strokeColor={0xff0000}
      strokeWidth={5}
      startAngle={0}
      endAngle={180}
      radius={50} />
  </Scene>
</Game>
```

## Properties

```properties
./../packages/svelte-phaser/dist/Arc.svelte
```
