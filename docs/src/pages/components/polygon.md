# Polygon

Renders a polygon.

# Usage

```example
<script>
  import { Game, Scene, Polygon } from 'svelte-phaser'
</script>

<Game width={400} height={400}>
  <Scene key="main">
    <Polygon
      x={200}
      y={200}
      points={[
        {
          x: 0,
          y: 20,
        },
        {
          x: 84,
          y: 20,
        },
        {
          x: 84,
          y: 0,
        },
        {
          x: 120,
          y: 50,
        },
        {
          x: 84,
          y: 100,
        },
        {
          x: 84,
          y: 80,
        },
        {
          x: 0,
          y: 80,
        },
      ]}
      strokeWidth={5}
      strokeColor={0xff0000} />
  </Scene>

</Game>
```

## Properties

```properties
./../packages/svelte-phaser/src/Polygon.svelte
```
