# IsoBox

Renders an isometric rectangle.

# Usage

```example
<script>
  import { Game, Scene, IsoBox } from 'svelte-phaser'
  import { tweened } from 'svelte/motion'
  import { cubicInOut } from 'svelte/easing'

  const projection = tweened(4, {
    duration: 2000,
    easing: cubicInOut
  })

  $: if ($projection === 20) {
    $projection = 4
  } else if ($projection === 4) {
    $projection = 20
  }
</script>

<Game width={400} height={400}>
  <Scene key="main">
    <IsoBox
      x={100}
      y={200}
      size={100}
      height={100}
      fillTop={0x00b9f2}
      fillLeft={0x016fce}
      fillRight={0x028fdf} />
    <IsoBox
      x={300}
      y={200}
      size={100}
      height={100}
      projection={$projection}
      fillTop={0x8dcb0e}
      fillLeft={0x3f8403}
      fillRight={0x63a505} />
  </Scene>

</Game>
```

## Properties

```properties
./../packages/svelte-phaser/dist/IsoBox.svelte
```
