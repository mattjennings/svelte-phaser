# Game

Creates a Phaser.Game instance. Only [Scene](/components/scene) components can be children of Game.

## Usage

```example
<script>
  import { Game } from 'svelte-phaser'
</script>

<Game width={400} height={400}/>
```

## Properties

```properties
width | The width of the game, in game pixels. | number(1024)

height | The height of the game, in game pixels. | number(1024)

zoom | Simple scale applied to the game canvas. 2 is double size, 0.5 is half size, etc. | number(1)

resolution | The size of each game pixel, in canvas pixels. Values larger than 1 are "high" resolution. |	number(1)

type |	Which renderer to use. Phaser.AUTO, Phaser.CANVAS, Phaser.HEADLESS, or Phaser.WEBGL. AUTO picks WEBGL if available, otherwise CANVAS. | number(Phaser.AUTO)

canvas | Provide your own Canvas element for Phaser to use instead of creating one. You will also need to set the type to Phaser.CANVAS |	HTMLCanvasElement

customEnvironment |Is Phaser running under a custom (non-native web) environment? If so, set this to true to skip internal Feature detection. If true the renderType cannot be left as AUTO. |	boolean(false)

context |Provide your own Canvas Context for Phaser to use, instead of creating one.
scene |	CanvasRenderingContext2D

seed | Seed for the random number generator. | string[]

title |	The title of the game. Shown in the browser console. | string

url | The URL of the game. Shown in the browser console. |	string

version | The version of the game. Shown in the browser console. |	string

autoFocus | Automatically call window.focus() when the game boots. Usually necessary to capture input events if the game is in a separate frame. |	boolean(true)

input |	Input configuration, or false to disable all game input. | Phaser.Types.Core.InputConfig, boolean

disableContextMenu | Disable the browser's default 'contextmenu' event (usually triggered by a right-button mouse click). |	boolean

transparent | Whether the game canvas will have a transparent background. |	boolean

banner | Configuration for the banner printed in the browser console when the game starts. |	boolean ,Phaser.Types.Core.BannerConfig

fps |	Game loop configuration. | Phaser.Types.Core.FPSConfig

render |Game renderer configuration.|	Phaser.Types.Core.RenderConfig

backgroundColor | The background color of the game canvas. The default is black. |	string,number(0x000000)

loader | Loader configuration. |	Phaser.Types.Core.LoaderConfig

images | Images configuration. |Phaser.Types.Core.ImagesConfig

physics | Physics configuration. |	Phaser.Types.Core.PhysicsConfig

plugins | Plugins to install.	| Phaser.Types.Core.PluginObject,Phaser.Types.Core.PluginObjectItem[]

scale | Scale configuration |	Phaser.Types.Core.ScaleConfig

audio | Audio configuration | Phaser.Types.Core.AudioConfig

```
