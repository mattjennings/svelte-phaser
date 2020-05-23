# Triangle

# Usage

```example
<script>
  import { Game, Scene, Triangle } from 'svelte-phaser'
</script>

<Game width={400} height={400}>
  <Scene key="main">
    <Triangle
      x={25}
      y={100}
      x1={0}
      y1={148}
      x2={148}
      y2={148}
      x3={74}
      y3={0}
      fillColor={0xff0000} />
    <Triangle
      x={200}
      y={100}
      x1={0}
      y1={148}
      x2={148}
      y2={148}
      x3={74}
      y3={0}
      strokeWidth={5}
      strokeColor={0xff0000} />
  </Scene>
</Game>
```

## Properties

It also receives the same props as [Graphics](components/graphics)

```properties
./../packages/svelte-phaser/src/Graphics/Triangle.svelte
```
