# Text

Renders text onto the canvas.

## Usage

```example
<script>
  import { Game, Scene, Text } from 'svelte-phaser'
</script>

<Game width={400} height={400}>
  <Scene key="main">
    <Text x={100} y={180} text="hello world" color="white" fontSize="28px" />
  </Scene>
</Game>
```

## Properties

```properties
./../packages/svelte-phaser/dist/Text.svelte
```

## Events

These events will not be emitted on Text components unless you set the `interactive` prop.

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
