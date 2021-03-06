# svelte/motion

You can use `svelte/motion` for animations just as you would in other Svelte applications.

## Spring

This is a recreation of an example from [a svelte.dev tutorial](https://svelte.dev/tutorial/actions)

```example
<script>
  import { Game, Scene, Text, Sprite } from 'svelte-phaser'
  import { spring } from 'svelte/motion'

  const startingPosition = { x: 300, y: 300 }

  const position = spring(
    startingPosition,
    {
      stiffness: 0.2,
      damping: 0.4,
    }
  )

  function handleDrag(event) {
    position.update($position => ({
      x: event.detail.dragX,
      y: event.detail.dragY,
    }), { hard: true })
  }

  function handleDragEnd() {
    position.set(startingPosition, { soft: 0.2 })
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
      x={$position.x}
      y={$position.y}
      rotation={($position.x - startingPosition.x) * 0.02}
      on:drag={handleDrag}
      on:dragend={handleDragEnd} />
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

  const barWidth = 200

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
      x={200}
      y={200}
      width={barWidth}
      height={50}
      strokeWidth={5}
      strokeColor={0xff0000} />
    <Rectangle
      x={100}
      y={200}
      originX={0}
      originY={0.5}
      width={$progress}
      height={50}
      fillColor={0xff0000} />
  </Scene>
</Game>
```
