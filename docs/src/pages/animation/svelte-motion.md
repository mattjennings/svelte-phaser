# svelte/motion

You can use `svelte/motion` for animations just as you would in other Svelte applications.

```example
<script>
  import { Game, Scene, Text, Sprite } from 'svelte-phaser'
  import { spring } from 'svelte/motion'

  const scale = spring(1)
  const coords = spring(
    { x: 200, y: 200 },
    {
      stiffness: 0.2,
      damping: 0.4,
    }
  )

  function handlePointerDown() {
    scale.set(1.5)
  }

  function handlePointerUp() {
    scale.set(1)
  }

  function handleDragStart() {
    coords.stiffness = coords.damping = 1
  }

  function handleDrag(event) {
    coords.update($coords => ({
      x: event.detail.dragX,
      y: event.detail.dragY,
    }))
  }

  function handleDragEnd() {
    coords.stiffness = 0.2
    coords.damping = 0.4
    coords.set({ x: 200, y: 200 })
  }
</script>

<Game
  width={400}
  height={400}>
  <Scene
    key="main"
    preload={scene => {
      scene.load.image('mushroom', 'static/images/mushroom.png')
    }}>
    <Text x={20} y={300} text="Try clicking and dragging the mushroom" />
    <Sprite
      texture="mushroom"
      draggable
      x={$coords.x}
      y={$coords.y}
      rotation={$coords.x * 0.0314}
      on:pointerdown={handlePointerDown}
      on:pointerout={handlePointerUp}
      on:pointerup={handlePointerUp}
      on:drag={handleDrag}
      on:dragend={handleDragEnd}
      on:dragstart={handleDragStart} />
  </Scene>
</Game>
```
