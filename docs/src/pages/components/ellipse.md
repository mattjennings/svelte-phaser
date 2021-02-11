# Ellipse

Renders an ellipse.

# Usage

```example
<script>
  import { Game, Scene, Ellipse } from 'svelte-phaser'
</script>

<Game width={400} height={400}>
  <Scene key="main">
    <Ellipse
      x={100}
      y={200}
      width={150}
      height={100}
      fillColor={0xff0000} />
    <Ellipse
      x={300}
      y={200}
      width={150}
      height={100}
      strokeWidth={5}
      strokeColor={0xff0000} />
  </Scene>

</Game>
```

## Properties

```properties
./../packages/svelte-phaser/dist/Ellipse.svelte
```
