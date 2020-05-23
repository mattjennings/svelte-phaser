<script>
  export let url
  export let width = 800
  export let height = 800
</script>

<style>
  div {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  iframe {
    border: none;
    border-radius: 5px;
    overflow: hidden;
  }
</style>

<div>
  <iframe src={url} title="example" {width} {height} scrolling="no" />
</div>
