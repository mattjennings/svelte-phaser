<script>
  import Phaser from 'phaser'
  import { onMount } from 'svelte'
  import { getScene, getSpawner } from 'svelte-phaser'
  import { score, gameStatus, enemiesDefeated } from './store'

  import Enemy from './Enemy.svelte'
  import Bullet from './Bullet.svelte'

  const scene = getScene()
  const { spawn } = getSpawner()

  let enemies = []
  let enemyVelocityX = 40
  let enemyY = 0

  // change direction every 3 seconds
  const moveTimer = scene.time.addEvent({
    callback: () => {
      if ($gameStatus === 'playing') {
        enemyVelocityX = -enemyVelocityX
        enemyY += 16
      }
    },
    loop: true,
    delay: 3500,
  })

  // shoot bullet at player every 2 seconds from random enemy
  const enemyShootTimer = scene.time.addEvent({
    callback: () => {
      if ($gameStatus === 'playing') {
        const player = scene.children.getByName('player')
        const enemies = scene.children.list.filter(
          child => child.name === 'enemy'
        )

        // get the gameobject reference of a random enemy
        const enemy =
          enemies[Phaser.Math.RND.integerInRange(0, enemies.length - 1)]

        if (player && enemy) {
          // get angle from enemy to player
          const angle =
            (Math.atan2(player.y - enemy.y, player.x - enemy.x) * 180) / Math.PI

          const velocity = scene.physics.velocityFromAngle(angle, 180)

          spawn(Bullet, {
            name: 'enemyBullet',
            texture: 'textures/enemy/bullet',
            target: 'player',
            x: enemy.x,
            y: enemy.y,
            velocityX: velocity.x,
            velocityY: velocity.y,
          })
        }
      }
    },
    loop: true,
    delay: 2000,
  })

  // cleanup timers
  onMount(() => () => {
    moveTimer.destroy()
    enemyShootTimer()
  })

  // create enemies on to start or on game reset
  $: if ($gameStatus === 'playing') {
    enemyY = 0
    enemies = Array.from({ length: 40 }).map((_, index) => {
      const columns = 10
      const column = index % columns
      const row = Math.floor(index / columns)

      return {
        x: column * 52,
        y: row * 32,
        // we add Date.now() so that all keys are changed between game resets
        // (if you're curious, remove Date.now() and see what happens when you reset the game)
        key: index + Date.now(),
      }
    })
  }

  // player wins
  $: if (enemies.length === 0) {
    enemiesDefeated.set(true)
  }
</script>

{#each enemies as enemy (enemy.key)}
  <Enemy
    x={100 + enemy.x}
    y={70 + enemy.y + enemyY}
    velocityX={$gameStatus === 'playing' ? enemyVelocityX : 0}
    onDie={() => {
      enemies = enemies.filter(e => e !== enemy)
      score.update(prev => prev + 100)
    }} />
{/each}
