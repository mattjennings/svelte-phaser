# Arcade Physics

Adds Arcade physics to the parent game object component. The Game or Scene must be configured to use arcade physics.

Arcade offers basic physics and collision capabilities. You can read more about Arcade physics [from the Phaser 3 documentation](https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.ArcadePhysics.html).

Alternatively, Phaser offers a Matter.js physics system, but svelte-phaser does not yet support it.

## Usage

```example
<script>
  import { Game, Scene, Sprite, ArcadePhysics } from 'svelte-phaser'
</script>

<Game width={400} height={400} physics={{ default: "arcade" }}>
  <Scene key="main" preload={scene => scene.load.image('mushroom', 'static/images/mushroom.png')}>
    <Sprite texture="mushroom" x={150} y={150}>
      <ArcadePhysics bounce={1} velocityX={150} velocityY={120} collideWorldBounds />
    </Sprite>
  </Scene>
</Game>
```

## Properties

```properties
./../packages/svelte-phaser/src/ArcadePhysics.svelte
```
