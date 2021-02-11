# Star

Renders a star.

# Usage

```example
<script>
  import { Game, Scene, Star } from 'svelte-phaser'
</script>

<Game width={400} height={400}>
  <Scene key="main">
    <Star
      x={100}
      y={200}
      points={5}
      outerRadius={64}
      innerRadius={32}
      fillColor={0xff0000} />
    <Star
      x={300}
      y={200}
      points={5}
      outerRadius={64}
      innerRadius={32}
      strokeWidth={5}
      strokeColor={0xff0000} />
  </Scene>

</Game>
```

## Properties

```properties
./../packages/svelte-phaser/dist/Star.svelte
```
