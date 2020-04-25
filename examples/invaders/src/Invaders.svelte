<script>
  import { getContext, onMount } from 'svelte'
  import { Sprite, ArcadePhysics } from 'svelte-phaser'
  import Background from './Background.svelte'

  const scene = getContext('phaser/scene')

  let enemyVelocityX = 40
  let enemyY = 16
  let moveTimer = scene.time.addEvent({
    callback: () => {
      enemyVelocityX = -enemyVelocityX
      enemyY += 16
    },
    loop: true,
    delay: 3500,
  })

  onMount(() => () => moveTimer.destroy())

  let array = Array.from({ length: 40 }).map((_, index) => {
    const columns = 10
    const column = index % columns
    const row = Math.floor(index / columns)

    return {
      x: column * 52,
      y: row * 32,
      key: index,
    }
  })
</script>

<Background />
{#each array as item, i}
  <Sprite x={100 + item.x} y={70 + item.y + enemyY} animation="anims/enemy/fly">
    <ArcadePhysics velocityX={enemyVelocityX} collideWorldBounds />
  </Sprite>
{/each}
