## Installation

```shell
$ npm install -D svelte-phaser
```

Then you can import it in your projects:

```example
<script>
  import { Game, Scene, Text } from 'svelte-phaser'
</script>

<Game width={400} height={400}>
  <Scene key="main">
    <Text x={140} y={180} text="hello world" />
  </Scene>
</Game>
```
