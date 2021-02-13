# Arcade Collider

Enables collisions against another Arcade physics-enabled game object.

## Usage

```example
<script>
  import Phaser from 'phaser'
  import { Game, Scene, Sprite, ArcadePhysics, ArcadeCollider } from 'svelte-phaser'
</script>

<Game width={400} height={400} physics={{ default: "arcade" }} scale={{ autoCenter: Phaser.Scale.CENTER_BOTH }}>
  <Scene key="main" preload={scene => scene.load.image('mushroom', '/static/images/mushroom.png')}>
    <Sprite name="mushroom" texture="mushroom" x={100} y={150}>
      <ArcadePhysics bounce={1} velocityX={150} collideWorldBounds/>
      <ArcadeCollider with="mushroom" />
    </Sprite>
    <Sprite name="mushroom" texture="mushroom" x={300} y={150}>
      <ArcadePhysics bounce={1} velocityX={-150} collideWorldBounds/>
      <ArcadeCollider with="mushroom" />
    </Sprite>
  </Scene>
</Game>
```

## Properties

```properties
allowCollision | Called when objects are about to collide. If it returns false the collision will be skipped | function
overlapOnly | Allows the objects to pass through eachother, but still fires collision events | boolean(false)
with | The name of the other game objects you want to collide with, or the game object itself. | string/string[]/Phaser.GameObjects.GameObject/Phaser.GameObjects.GameObject[]
```

## Events

```properties
on:collide | Fired when the objects collide | function
```
