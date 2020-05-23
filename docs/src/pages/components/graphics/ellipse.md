# Ellipse

# Usage

```example
<script>
  import { Game, Scene, Ellipse } from 'svelte-phaser'
</script>

<Game width={400} height={400}>
  <Scene key="main">
    <Ellipse x={100} y={75} width={200} height={100} fillColor={0xff0000} />
    <Ellipse x={100} y={135} width={200} height={100} strokeWidth={5} strokeColor={0xff0000} />
  </Scene>
</Game>
```

## Properties

It also receives the same props as [Graphics](components/graphics)

```properties
./../packages/svelte-phaser/src/Graphics/Ellipse.svelte
```
