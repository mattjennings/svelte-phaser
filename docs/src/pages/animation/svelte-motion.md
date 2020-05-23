# svelte/motion

You can use `svelte/motion` for animations just as you would in other Svelte applications.

This is a recreation of an example from [a svelte.dev tutorial](https://svelte.dev/tutorial/actions)

```example
<script>
  import { Game, Scene, Text, Sprite } from 'svelte-phaser'
  import { spring } from 'svelte/motion'

  const position = { x: 300, y: 300 }

  const coords = spring(
    position,
    {
      stiffness: 0.2,
      damping: 0.4,
    }
  )

  function handleDrag(event) {
    coords.update($coords => ({
      x: event.detail.dragX,
      y: event.detail.dragY,
    }), { hard: true })
  }

  function handleDragEnd() {
    coords.set(position, { soft: 0.2 })
  }
</script>

<Game
  width={600}
  height={600}>
  <Scene
    key="main"
    preload={scene => {
      scene.load.image('mushroom', 'static/images/mushroom.png')
    }}>
    <Text x={300} y={400} originX={0.5} text="Try clicking and dragging the mushroom" />
    <Sprite
      texture="mushroom"
      draggable
      x={$coords.x}
      y={$coords.y}
      rotation={($coords.x - position.x) * 0.02}
      on:drag={handleDrag}
      on:dragend={handleDragEnd} />
  </Scene>
</Game>
```
