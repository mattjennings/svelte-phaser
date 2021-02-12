# Getting Started

This is still very much a work in progress. Many features of Phaser are still missing. Please be aware that breaking changes **will** happen during these early stages, but don't let that scare you from giving it a try.

### Creating a new project

```shell
npx degit mattjennings/svelte-phaser/templates/svite my-first-game
cd my-first-game
npm install
npm run dev

# or if you prefer typescript:

npx degit mattjennings/svelte-phaser/templates/svite-typescript my-first-game
cd my-first-game
npm install
npm run dev
```

There are some other [templates](https://github.com/mattjennings/svelte-phaser/tree/master/templates) available as well

If a blank project is too boring, feel free to look through the [examples](https://github.com/mattjennings/svelte-phaser/tree/master/examples).

### Adding to an existing project

If you have an existing svelte project, run:

```shell
npm install phaser svelte-phaser
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
