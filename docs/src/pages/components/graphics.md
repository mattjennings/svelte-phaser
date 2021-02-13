# Graphics

Renders a Phaser.Graphics object.

It receives a `draw` prop which allows you to access the Phaser.Graphics instance and use its API. `draw` is called on initialization and when the reference is updated. This means you can define it in a reactive expression and it will re-draw whenever it updates.

# Usage

```example
<script>
  import Phaser from 'phaser'
  import { onMount } from 'svelte'
  import { Game, Scene, Graphics } from 'svelte-phaser'

  let game
  let gap = 50
  let expand = false

  onMount(() => {
    function step() {
      gap += expand ? 2 : -2

      if (gap <= 0 || gap >= 50) {
        expand = !expand
      }
    }

    game.events.on('step', step)

    return () => {
      game.events.off('step', step)
    }
  })

  $: draw = (graphics) => {
    graphics.clear();
    graphics.slice(0, 0, 100, Phaser.Math.DegToRad(360 - gap), Phaser.Math.DegToRad(gap), true);
    graphics.fillPath();
  }
</script>

<Game bind:instance={game} width={400} height={400} scale={{ autoCenter: Phaser.Scale.CENTER_BOTH }}>
  <Scene key="main">
    <Graphics
      x={200}
      y={200}
      fillStyle={{ color: 0xffff00 }}
      draw={draw}
    />
  </Scene>
</Game>
```

## Properties

```properties
./../packages/svelte-phaser/dist/Graphics.svelte
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
