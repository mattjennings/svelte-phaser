<script>
  import { getContext } from 'svelte'
  import { onGameEvent, onInputEvent } from 'svelte-phaser'
  import Paddle from './Paddle.svelte'
  import Ball from './Ball.svelte'
  import Block from './Block.svelte'

  const scene = getContext('phaser/scene')

  // set collisions on all edges of world except bottom
  scene.physics.world.setBoundsCollision(true, true, true, false)

  let isBallLaunched = false
  let paddle
  let ball
  let blocks = []

  setup()

  onGameEvent('step', () => {
    // snap ball to paddle
    if (!isBallLaunched) {
      ball.setPosition(paddle.x, paddle.y - 48)
    }

    // reset ball after it hits bottom of screen
    if (ball.y > 800) {
      ball.body.setVelocity(0)
      isBallLaunched = false
    }

    // you win!
    if (blocks.length === 0) {
      ball.body.setVelocity(0)
      setup()
    }
  })

  // launch ball on click
  onInputEvent('pointerdown', () => {
    if (!isBallLaunched) {
      isBallLaunched = true
      ball.body.setVelocity(-75, -600)
    }
  })

  // setup game
  function setup() {
    isBallLaunched = false

    // create an array of 60 blocks
    blocks = Array.from({ length: 60 }).map((_, index) => {
      // possible sprites to use for block
      const blockFrames = [
        'blue1',
        'red1',
        'green1',
        'yellow1',
        'silver1',
        'purple1',
      ]

      return {
        x: (index % 10) * 64,
        y: 10 * Math.floor(index / 10) * 3.2,
        // each row uses same sprite
        frame: blockFrames[Math.floor(index / 10)],
        key: index,
      }
    })
  }
</script>

<Paddle bind:instance={paddle} x={400} y={700} />
<Ball bind:instance={ball} />
{#each blocks as block (block.key)}
  <Block
    x={block.x + 116}
    y={block.y + 200}
    frame={block.frame}
    onBallHit={() => {
      blocks = blocks.filter(b => b !== block)
    }} />
{/each}
