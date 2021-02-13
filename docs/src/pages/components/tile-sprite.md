# TileSprite

TileSprites are Sprites that have repeating textures.

The texture can be scrolled and scaled independently of the TileSprite itself. Textures will automatically wrap and are designed so that you can create game backdrops using seamless textures as a source.

## Usage

```example
<script>
  import Phaser from 'phaser'
  import { onMount } from 'svelte'
  import { Game, Scene, TileSprite } from 'svelte-phaser'

  let game
  let tilePositionY = 0

  onMount(() => {
    game.events.on('step', () => {
      tilePositionY -= 1
    })
  })
</script>

<Game bind:instance={game} width={400} height={400} scale={{ autoCenter: Phaser.Scale.CENTER_BOTH }}>
  <Scene
    key="main"
    preload={(scene) => {
      scene.load.image('starfield', '/static/images/starfield.png')
    }}
  >
    <TileSprite
      x={0}
      y={0}
      width={400}
      height={400}
      originX={0}
      originY={0}
      texture="starfield"
      {tilePositionY} />
  </Scene>
</Game>

```

## Properties

```properties
./../packages/svelte-phaser/dist/TileSprite.svelte
```

## Events

```properties
on:drag | Pointer drag input event | function
on:dragend | Pointer drag end input event | function
on:dragenter | Pointer drag enter input event | function
on:dragleave | Pointer drag leave input event | function
on:dragstart | Pointer drag start input event | function
on:drop | Pointer drag drop input event | function
on:pointerdown | Pointer down input event | function
on:pointermove | Pointer move input event | function
on:pointerout | Pointer out input event | function
on:pointerover | Pointer over input event | function
on:pointerup | Pointer up input event | function
on:pointerwheel | Pointer wheel input event | function
```
