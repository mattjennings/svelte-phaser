# Circle

# Usage

```example
<script>
  import { Game, Scene, Circle } from 'svelte-phaser'
</script>

<Game width={400} height={400}>
  <Scene key="main">
    <Circle
      x={65}
      y={75}
      radius={50}
      fillColor={0xff0000} />
    <Circle
      x={135}
      y={75}
      radius={50}
      strokeWidth={5}
      strokeColor={0xff0000} />
  </Scene>
</Game>
```

## Properties

It also receives the same props as [Graphics](components/graphics)

```properties
./../packages/svelte-phaser/src/Graphics/Circle.svelte
```
