<script>
  import { Image, ArcadePhysics, ArcadeCollider } from 'svelte-phaser'

  export let instance = undefined

  function handlePaddleCollide(event) {
    const { self, other: paddle } = event.detail

    if (self.x < paddle.x) {
      const diff = paddle.x - self.x
      self.body.setVelocityX(-10 * diff)
    } else if (self.x > paddle.x) {
      const diff = self.x - paddle.x
      self.body.setVelocityX(10 * diff)
    } else {
      self.body.setVelocityX(2 + Math.random() * 8)
    }
  }
</script>

<Image bind:instance name="ball" texture="assets" frame="ball1">
  <ArcadePhysics collideWorldBounds bounce={1} />
  <ArcadeCollider with="paddle" on:collide={handlePaddleCollide} />
</Image>
