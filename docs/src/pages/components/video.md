# Video

Renders a video

## Usage

### Loading video from cache

```example
<script>
  import Phaser from 'phaser'
  import { Text, Game, Scene, Video } from 'svelte-phaser'

  function preload(scene) {
    // the last parameter, `noAudio`, should allow the browser to autoplay the video
    // otherwise the video will require user interaction to start playing
    scene.load.video('wormhole', 'static/videos/wormhole.mp4', 'loadeddata', false, true)
  }
</script>

<Game
  width={400}
  height={400}
  scale={{ autoCenter: Phaser.Scale.CENTER_BOTH }}
>
  <Scene key="main" {preload}>
    <slot slot="loading">
      <Text x={128} y={112} text="Loading..." color="white" />
    </slot>
    <Video
      key="wormhole"
      x={0}
      y={0}
      play
      originX={0}
      originY={0}
    />
  </Scene>
</Game>
```

### Loading video lazily from URL

```example
<script>
  import Phaser from 'phaser'
  import { Text, Game, Scene, Video } from 'svelte-phaser'
</script>

<Game
  width={400}
  height={400}
  scale={{ autoCenter: Phaser.Scale.CENTER_BOTH }}
>
  <Scene key="main">
    <Video
      x={0}
      y={0}
      play
      originX={0}
      originY={0}
      load={{
        url: 'static/videos/wormhole.mp4',
        noAudio: true,
      }}
    />
  </Scene>
</Game>
```

### Loading video from stream

```example
<script>
  import Phaser from 'phaser'
  import { onMount } from 'svelte'
  import { Text, Game, Scene, Video } from 'svelte-phaser'

  let stream = null
  let aspectRatio = 1

  function requestWebcam() {
    if (!stream && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (res) {
          stream = res
          aspectRatio = stream.getVideoTracks()[0].getSettings().aspectRatio
        })
        .catch(function (err) {
          console.error(err)
        });
    }
  }
</script>

<Game
  width={800}
  height={600}
  scale={{ autoCenter: Phaser.Scale.CENTER_BOTH }}
>
  <Scene key="main" on:pointerdown={requestWebcam}>
    {#if !stream}
      <Text x={280} y={300} text="Click here to start webcam" color="white" />
    {/if}

    <Video
      x={400}
      y={300}
      displayWidth={800}
      displayHeight={800 / aspectRatio}
      origin={0.5}
      load={{
        stream: stream,
        noAudio: true,
      }}
    />
  </Scene>
</Game>
```

## Properties

```properties
./../packages/svelte-phaser/dist/Video.svelte
```

## Events

```properties
on:unlocked | Video is unlocked by a user gesture | function
on:error | Video tries to play a source that does not exist, or is the wrong file type | function
on:play | Video beings playback | function
on:complete | Video finishes playback by reaching the end of its duration, or markerOut | function
on:loop | Video that is currently playing has looped | function
on:seeking | Video begins seeking to a new point in its timeline | function
on:seeked | Video completes seeking to a new point in its timeline | function
on:created | Enough of the video source has been loaded, that the browser is able to render a frame from it |  function
on:timeout | Video has exhausted its allocated time while trying to connect to a video source to start playback | function
on:stop | Video is stopped from playback via a call to the video.stop method | function
on:drag | Pointer drag input event | function
on:dragend | Pointer drag end input event | function
on:dragenter | Pointer drag enter input event | function
on:dragleave | Pointer drag leave input event | function
on:dragstart | Pointer drag start input event | function
on:drop | Pointer drag drop input event | function
on:pointerdown | Pointer down input event | function
on:pointermove | Pointer move input event | function
on:pointerout | Pointer out input event | function
on:pointerover | Pointer over input event | function
on:pointerup | Pointer up input event | function
on:pointerwheel | Pointer wheel input event | function
```
