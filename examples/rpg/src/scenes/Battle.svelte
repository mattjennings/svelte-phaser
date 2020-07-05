<script>
  import { Text, Scene, onGameEvent, getSceneRouter } from 'svelte-phaser'

  const router = getSceneRouter()
  let keys
  function create(scene) {
    keys = {
      space: scene.input.keyboard.addKey('space'),
    }
  }

  function update() {
    if (Phaser.Input.Keyboard.JustDown(keys.space)) {
      router.pop()
    }
  }
</script>

<Scene {...$$props} {create} {update}>
  <Text x={100} y={100} text="hello" color="white" />
</Scene>
