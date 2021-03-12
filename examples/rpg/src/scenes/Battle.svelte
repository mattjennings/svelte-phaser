<script>
  import { HTML, Scene } from 'svelte-phaser'
  import { getRouter } from '../context'
  import WorldMap from './WorldMap.svelte'

  const router = getRouter()

  let keys
  let exited = false

  function create(scene) {
    keys = {
      space: scene.input.keyboard.addKey('m'),
    }
  }

  function update() {
    if (Phaser.Input.Keyboard.JustDown(keys.space)) {
      // $router.remove($$props.key)
      $router.go({ component: WorldMap })
    }
  }
</script>

<Scene {...$$props} {create} {update}>
  <HTML x={10} y={180}>
    <div class="menu">
      <ul>
        <li>Attack</li>
      </ul>
    </div>
  </HTML>
</Scene>

<style>
  .menu {
    height: 50px;
    width: 200px;
    background: blue;
    border: 3px solid white;
    border-radius: 5px;
    margin: 4px;
    color: white;
  }
</style>
