# svelte/motion

You can use `svelte/motion` for animations just as you would in other Svelte applications.

## Spring

This is a recreation of an example from [a svelte.dev tutorial](https://svelte.dev/tutorial/actions)

```example
<script>
  import { Game, Scene, Text, Sprite } from 'svelte-phaser'
  import { spring } from 'svelte/motion'

  const coords = spring(
    { x: 200, y: 200 },
    {
      stiffness: 0.2,
      damping: 0.4,
    }
  )

  function handleDragStart() {
    coords.stiffness = 1
    coords.damping = 1
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
      on:drag={handleDrag}
      on:dragend={handleDragEnd}
      on:dragstart={handleDragStart} />
  </Scene>
</Game>
```

## Tween

```example
<script>
  import { onMount} from 'svelte'
  import { Game, Scene, Rectangle} from 'svelte-phaser'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'

  const barWidth = 360

  const progress = tweened(barWidth / 5, {
    duration: 400,
    easing: cubicOut
  })


  onMount(() => {
    const interval = setInterval(() => {
      if ($progress < barWidth) {
      $progress += barWidth / 5
      } else {
        $progress = barWidth / 5
      }
    }, 1000)

    return () => clearInterval(interval)
  })
</script>

<Game
  width={400}
  height={400}>
  <Scene key="main">
    <Rectangle
      type="stroke"
      x={10}
      y={50}
      width={barWidth}
      height={50}
      strokeWidth={5}
      strokeColor={0xff0000}
      cornerRadius={5}>
      <Rectangle
        x={10}
        y={50}
        width={$progress}
        height={50}
        fillColor={0xff0000}
        cornerRadius={5} />
      </Rectangle>
  </Scene>
</Game>
```
