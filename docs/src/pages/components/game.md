# Game

Creates a Phaser.Game instance. Only [Scene](/components/scene) components can be children of Game.

## Usage

```example
<script>
  import { Game } from 'svelte-phaser'
</script>

<Game width={400} height={400}/>
```

## Properties

```properties
./../packages/svelte-phaser/src/Game.svelte
```

## Events

```properties
on:preBoot | Called at the start of the boot sequence. | function
on:postBoot | Called at the end of the boot sequence. At this point, all the game systems have started and plugins have been loaded. | function
```
