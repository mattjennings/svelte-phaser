# Camera

Creates a 2D Camera.

[Read more about Cameras at the Phaser docs](https://photonstorm.github.io/phaser3-docs/Phaser.Cameras.Scene2D.Camera.html)

## Usage

```example
<script>
  import Phaser from 'phaser'
  import { Game, Scene, Text, Camera } from 'svelte-phaser'
</script>

<Game width={400} height={400} scale={{ autoCenter: Phaser.Scale.CENTER_BOTH }}>
  <Scene key="main">

  <Camera x={0} y={0} width={400} height={400}>
    <Text x={100} y={180} text="todo: better example" color="white"/>
    </Camera>
  </Scene>
</Game>
```

## Properties

```properties
./../packages/svelte-phaser/dist/Camera.svelte
```
