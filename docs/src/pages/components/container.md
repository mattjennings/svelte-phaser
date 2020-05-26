# Container

Containers are used to group game objects together. All children are positioned relative to the parent container and inherit any transform properties (such as scale or angle).

[Read more about Containers](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Container.html)

# Usage

```example
<script>
  import { onMount } from 'svelte'
  import { Game, Scene, Rectangle, Container } from 'svelte-phaser'

  let game

  let x = 100
  let direction = 1
  let angle = 0

  onMount(() => {
    function step() {
      x += direction
      angle += 1

      if (x > 200 || x < 100) {
        direction = direction * -1
      }
    }

    game.events.on('step', step)

    return () => {
      game.events.off('step', step)
    }
  })
</script>

<Game bind:instance={game} width={400} height={400}>
  <Scene key="main">
    <Container bind:x y={200} width={100} height={100} {angle}>
      <Rectangle
        x={0}
        y={50}
        width={50}
        height={50}
        fillColor={0xff0000} />
      <Rectangle
        x={100}
        y={0}
        width={50}
        height={50}
        fillColor={0xff0000} />
    </Container>
  </Scene>

</Game>
```

## Properties

```properties
./../packages/svelte-phaser/src/Container.svelte
```
