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
      scene.load.image('mushroom', '/static/images/mushroom.png')
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
        '/static/images/adventurer-spritesheet.png',
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
./../packages/svelte-phaser/dist/Sprite.svelte
```

## Events

```properties
on:animationstart | Animation has started playing | function
on:animationcomplete | Animation has finished playing | function
on:animationrestart | Animation has restarted | function
on:animationrepeat | A repeating animation has begun a repeat | function
on:drag | Pointer drag input event | function
on:dragend | Pointer drag end input event | function
on:dragenter | Pointer drag enter input event | function
on:dragleave | Pointer drag leave input event | function
on:dragstart | Pointer drag start input event | function
on:drop | Pointer drag drop input event | function
on:pointerdown | Pointer down input event | function
on:pointermove | Pointer move input event | function
on:pointerout | Pointer out input event | function
on:pointerover | Pointer over input event | function
on:pointerup | Pointer up input event | function
on:pointerwheel | Pointer wheel input event | function
```
