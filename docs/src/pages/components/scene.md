# Scene

A Scene is required to render components into your game. Typically Scenes are used as levels, or stages; however,
you can render more than one at a time if you wish.

Every Scene requires a `key` which should be a unique identifier. If you have textures or other assets that are used in the scene
you can load them with the `preload` prop.

## Usage

### Preloading Assets

```example
<script>
  import { Game, Scene, Sprite } from 'svelte-phaser'
</script>

<Game width={400} height={400}>
  <Scene
    key="main"
    preload={(scene) => {
      scene.load.image('mushroom', '/svelte-phaser/static/images/mushroom.png')
    }}
  >
    <Sprite x={200} y={200} texture="mushroom" />
  </Scene>
</Game>
```

### Loading Screen

Scenes have a slot that can be used for loading screen. Svelte does not support slots on non-DOM elements,
but we can make use of the `svelte-fragment` package to render a custom loading screen.

```example
<script>
  import { Game, Scene, Sprite, Text } from 'svelte-phaser'
  import fragment from 'svelte-fragment'
</script>

<Game width={400} height={400}>
  <Scene
    key="main"
    preload={async (scene) => {
      scene.load.image('mushroom', '/svelte-phaser/static/images/mushroom.png')
      scene.load.image('mushroom2', '/svelte-phaser/static/images/mushroom2.png')

      // because we're only loading 2 assets the loading screen
      // will go by pretty quick. try throttling your network speed
      // in your browser dev tools and then clicking one of the mushrooms
    }}
  >
    <template use:fragment slot="loading" let:progress>
      <Text
        x={100}
        y={100}
        text={`Loading... ${Math.round(progress * 100)}%`}
        color="white" />
    </template>

    <Sprite x={136} y={200} texture="mushroom" on:pointerdown={() => window.location.reload()}/>
    <Sprite x={264} y={200} texture="mushroom2" on:pointerdown={() => window.location.reload()}/>
    <Text x={60} y={300} text="Did it load too fast? Click a mushroom to reload the game" wordWrap={300} />
  </Scene>
</Game>
```

## Properties

```properties
./../packages/svelte-phaser/src/Scene.svelte
```
