# Sprite

Renders an image onto the canvas. Sprites can be either static or animated.

They require a texture to be loaded first, so be sure to load them in the Scene's `preload`.

## Usage

### Static

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

### Animated

```example
<script>
  import { Game, Scene, Sprite } from 'svelte-phaser'
</script>

<Game width={400} height={400}>
  <Scene
    sceneKey="main"
    preload={(scene) => {
      scene.load.spritesheet(
        'adventurer',
        '/svelte-phaser/static/images/adventurer-spritesheet.png',
        {
          frameWidth: 50,
          frameHeight: 37,
        }
      )
    }}
    create={(scene) => {
      scene.anims.create({
        key: 'idle',
        frames: scene.anims.generateFrameNumbers('adventurer', {
          start: 0,
          end: 3,
        }),
        frameRate: 10,
        repeat: -1,
      })
    }}
  >
    <Sprite x={200} y={200} texture="adventurer" animation="idle" scale={2} />
  </Scene>
</Game>
```

## Properties

```properties
./../packages/svelte-phaser/src/Sprite.svelte
```
