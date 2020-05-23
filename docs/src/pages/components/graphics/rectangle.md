# Rectangle

# Usage

```example
<script>
  import { Game, Scene, Rectangle } from 'svelte-phaser'
</script>

<Game width={400} height={400}>
  <Scene key="main">
    <Rectangle
      x={45}
      y={75}
      width={100}
      height={100}
      fillColor={0xff0000} />
    <Rectangle
      x={125}
      y={75}
      width={100}
      height={100}
      strokeWidth={5}
      strokeColor={0xff0000} />
  </Scene>

</Game>
```

## Properties

It also receives the same props as [Graphics](components/graphics)

```properties
./../packages/svelte-phaser/src/Graphics/Rectangle.svelte
```
