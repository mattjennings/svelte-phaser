# Rectangle

Renders a rectangle.

# Usage

```example
<script>
  import { Game, Scene, Rectangle } from 'svelte-phaser'
</script>

<Game width={400} height={400}>
  <Scene key="main">
    <Rectangle
      x={100}
      y={200}
      width={100}
      height={100}
      fillColor={0xff0000} />
    <Rectangle
      x={300}
      y={200}
      width={100}
      height={100}
      strokeWidth={5}
      strokeColor={0xff0000} />
  </Scene>

</Game>
```

## Properties

```properties
./../packages/svelte-phaser/dist/Rectangle.svelte
```
