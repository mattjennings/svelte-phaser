<script>
  import { onMount } from 'svelte'
  import { Sprite, ArcadePhysics, getScene, Spawner } from 'svelte-phaser'
  import Background from './Background.svelte'
  import Player from './Player.svelte'
  import Enemy from './Enemy.svelte'

  const scene = getScene()

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

  let enemies = Array.from({ length: 40 }).map((_, index) => {
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

<Spawner>
  <Background />
  <Player x={300} y={500} />
  {#each enemies as enemy (enemy.key)}
    <Enemy
      x={100 + enemy.x}
      y={70 + enemy.y + enemyY}
      velocityX={enemyVelocityX}
      onDie={() => {
        enemies = enemies.filter(e => e !== enemy)
      }} />
  {/each}
</Spawner>
