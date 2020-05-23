# Graphics

Used to draw primitive shapes. It is best suited for creating shape components, using the
[Phaser.GameObjects.Graphics](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Graphics.html) API.

For example, we could create a Circle component:

```svelte
<script>
  import { Graphics } from 'svelte-phaser'

  export let x
  export let y
  export let radius

  let instance

  // apply props by calling Graphics method in a reactive statement
  $: instance && instance.fillCircle(x, y, radius)
</script>

<Graphics bind:instance bind:x bind:y {...$$restProps} />
```

and then it can be used like so

```svelte
<script>
  import { Circle } from './Circle.svelte'
</script>

<Circle x={100} y={100} radius={50} fillColor={0xff000} />
```

We've already done this for a few shapes and provided them for you:

- [Circle](components/graphics/circle)
- [Ellipse](components/graphics/ellipse)
- [Rectangle](components/graphics/rectangle)
- [Triangle](components/graphics/triangle)

## Properties

```properties
./../packages/svelte-phaser/src/Graphics/Graphics.svelte
```
