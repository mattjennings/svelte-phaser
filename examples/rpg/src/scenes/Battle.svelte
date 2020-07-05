<script>
  import { Text, Scene, onGameEvent, getSceneRouter } from 'svelte-phaser'
  import { slide } from 'svelte/transition'
  import { quintOut } from 'svelte/easing'

  const router = getSceneRouter()
  let keys
  let exited = false

  function create(scene) {
    keys = {
      space: scene.input.keyboard.addKey('space'),
    }
  }

  function update() {
    if (!exited && Phaser.Input.Keyboard.JustDown(keys.space)) {
      exited = true
      router.pop()
    }
  }
</script>

<style>
  .menu {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 20%;
    background: blue;
    border: 3px solid white;
    border-radius: 5px;
    margin: 4px;
    color: white;
  }
</style>

<Scene {...$$props} {create} {update}>
  <!-- <Text x={100} y={100} text="hello" color="white" /> -->
</Scene>

<!-- <div class="menu" transition:slide={{ easing: quintOut }}>
  <ul>
    <li>Attack</li>
  </ul>
</div> -->
