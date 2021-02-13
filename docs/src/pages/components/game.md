# Game

Creates a Phaser.Game instance. Only [Scene](/svelte-phaser/components/scene/) components can be children of Game.

## Usage

```example
<script>
  import Phaser from 'phaser'
  import { Game } from 'svelte-phaser'
</script>

<Game width={400} height={400} scale={{ autoCenter: Phaser.Scale.CENTER_BOTH }} />
```

## Properties

```properties
./../packages/svelte-phaser/dist/Game.svelte
```

## Events

```properties
on:preBoot | Called at the start of the boot sequence. | function
on:postBoot | Called at the end of the boot sequence. At this point, all the game systems have started and plugins have been loaded. | function
```
