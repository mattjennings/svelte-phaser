<script lang="ts">
  import { setContext } from 'svelte'

  setContext('phaser/spawner', { spawn })

  let nextId = 0
  let instances = []

  export function spawn(component, props) {
    instances = [
      ...instances,
      {
        component,
        props,
        key: ++nextId,
      },
    ]
  }

  export function onDestroy(instance) {
    instances = instances.filter((i) => i !== instance)
  }
</script>

{#each instances as instance (instance.key)}
  <svelte:component
    this={instance.component}
    onDestroy={() => onDestroy(instance)}
    {...instance.props}
  />
{/each}
<slot />
