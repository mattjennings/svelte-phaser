# Getting Started

### Creating a new project

The easiest way to get started is to create a new project using the blank template:

```shell
npx degit mattjennings/svelte-phaser/templates/blank my-first-game
cd my-first-game
npm install
npm run dev
```

If a blank project is too boring, feel free to look through the [examples](https://github.com/mattjennings/svelte-phaser/tree/master/examples).

### Adding to an existing project

If you have an existing svelte project you can just install `svelte-phaser`:

```shell
npm install svelte-phaser
```

and then import it:

```svelte
<script>
  import { Game, Scene, Text } from 'svelte-phaser'
</script>

<Game width={400} height={400}>
  <Scene key="main">
    <Text x={140} y={180} text="hello world" />
  </Scene>
</Game>
```
