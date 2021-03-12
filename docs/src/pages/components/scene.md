# Scene

A Scene is required to render components into your game. Typically Scenes are used as levels, or stages; however,
you can render more than one at a time if you wish.

Every Scene requires a `key` which should be a unique identifier. If you have textures or other assets that are used in the scene
you can load them with the `preload` prop.

## Usage

### Preloading Assets

```example
<script>
  import Phaser from 'phaser'
  import { Game, Scene, Sprite } from 'svelte-phaser'
</script>

<Game width={400} height={400} scale={{ autoCenter: Phaser.Scale.CENTER_BOTH }}>
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

### Loading Screen

Scenes have a `loading` slot that is rendered while it is preloading assets. You can get the progress
by using `let:progress` on the Scene

```example
<script>
  import Phaser from 'phaser'
  import { onMount } from 'svelte'
  import { Game, Scene, Sprite, Text, Rectangle } from 'svelte-phaser'

  onMount(() => {
    const cb = () => window.location.reload()

    window.addEventListener('pointerdown', cb)
    return () => window.removeEventListener('pointerdown', cb)
  })

  // imitates a long load for the scene
  function fakeLoad(scene) {
      scene.load.emit('progress', 0.1)

      setTimeout(() => {
        scene.load.emit('progress', 0.5)
      }, 1000)

      setTimeout(() => {
        scene.load.emit('progress', 0.75)
      }, 2000)

      setTimeout(() => {
        scene.load.emit('progress', 1)
        scene.load.emit('complete')
      }, 3000)
  }
</script>

<Game width={400} height={400} scale={{ autoCenter: Phaser.Scale.CENTER_BOTH }}>
  <Scene
    key="main"
    let:progress
    preload={async (scene) => {
      fakeLoad(scene)
    }}
  >
    <slot slot="loading">
      <Text
        x={120}
        y={200}
        text={`Loading... ${Math.round(progress * 100)}%`}
        color="white" />
    </slot>

    <Text x={40} y={200} text="Loading complete. Click to reload." />
  </Scene>
</Game>
```

## Properties

```properties
./../packages/svelte-phaser/dist/Scene.svelte
```

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
on:transitioninit | Scene Transition Init Event | function
on:transitionout | Scene Transition Out Event | function
on:transitionstart | Scene Transition Start Event | function
on:transitioncomplete | Scene Transition Complete Event | function
on:transitionwake | Scene Transition Wake Event | function
```
