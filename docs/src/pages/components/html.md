# HTML

Renders an HTML element in the canvas.

[You can read more on how DOM elements work in the official Phaser documentation](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.DOMElement.html)

## Usage

In order to use HTML components, you must configure the Game to have an overlaying DOM container. The Game needs a reference to an already mounted element, so we need to delay the mounting of Game until we have it.

```example
<script>
  import Phaser from 'phaser'
  import { Game, Scene, HTML, ArcadePhysics } from 'svelte-phaser'

  let parent
  let clicks = 0

</script>

<div bind:this={parent}>
  <!-- parent node needs to be mounted first -->
  {#if !!parent}
    <Game
      {parent}
      dom={{
        createContainer: true,
      }}
      width={400}
      height={400}
      scale={{ autoCenter: Phaser.Scale.CENTER_BOTH }}
      physics={{
        default: 'arcade',
      }}
    >
      <Scene key="main">
        <HTML x={0} y={0}>
          <p>{clicks} clicks</p>
        </HTML>
        <HTML x={200} y={100}>
          <ArcadePhysics
            bounce={1}
            velocityX={200}
            velocityY={-100}
            collideWorldBounds
            offsetY={12}
            offsetX={4}
            angularVelocity={200}
            circle={{ radius: 35 }}
          />
          <span
            on:click={() => {
              clicks += 1
            }}>
            🤔
          </span>
        </HTML>
      </Scene>
    </Game>
  {/if}
</div>

<style>
  p {
    color: white;
    font-size: 32px;
    font-weight: 500;
    text-align: center;
    width: 400px;
    padding-top: 32px;
    user-select: none;
  }

  span {
    font-size: 80px;
    cursor: pointer;
    user-select: none;
  }
</style>
```

## Properties

```properties
./../packages/svelte-phaser/dist/HTML.svelte
```

## Events

No events are emitted from HTML component but you can listen to events from the HTML element itself.
