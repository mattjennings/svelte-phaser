# Camera

Creates a 2D Camera.

[Read more about Cameras at the Phaser docs](https://photonstorm.github.io/phaser3-docs/Phaser.Cameras.Scene2D.Camera.html)

## Usage

```example
<script>
  import { Game, Scene, Text, Camera } from 'svelte-phaser'

</script>

<Game width={400} height={400}>
  <Scene key="main">

  <Camera x={0} y={0} width={400} height={400}>
    <Text x={100} y={180} text="todo: better example" />
    </Camera>
  </Scene>
</Game>
```

## Properties

```properties
./../packages/svelte-phaser/src/Camera.svelte
```
