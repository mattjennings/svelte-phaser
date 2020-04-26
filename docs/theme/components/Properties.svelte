<script>
  /* (!) Restart bandler if this file was edited
   *
   *   Properties data structure:
   *   data = [
   *       {
   *           name <string>,
   *           description <string>,
   *           attr[
   *               default<string>,
   *               types: <string> | [ <string> ]
   *           ]
   *       },
   *       ...
   *   ]
   */
  export let data

  $: sanitizedData = data
    .map(prop => {
      // optional props in our components will often be explicitly set to `undefined`
      // so that we can let phaser decide what the defaults are when it eventually receives
      // the value. However, they still get parsed as "required" props here,
      // so we'll look for a special __REQUIRED__ text in the description to determine if it
      // actually is required
      const required =
        !prop.attr.default &&
        (prop.description && prop.description.match(/__REQUIRED__\n/))

      // and then we'll remove the __REQUIRED__ from the description
      const description =
        prop.description && prop.description.replace(/__REQUIRED__\n\s?/, '')

      return {
        ...prop,
        required,
        description,
      }
    })
    .sort((aProp, bProp) => {
      // sort required first
      if (aProp.required && !bProp.required) {
        return -1
      }

      if (bProp.required && !aProp.required) {
        return 1
      }

      // then sort alphabetically
      return aProp.name < bProp.name ? -1 : 1
    })

  function getTypes(types) {
    if (!types) return ''

    const typeValue = type => {
      if (!type) return ''
      if (typeof type === 'string') return type

      return type.map(v => `<i>${v}</i>`).join(',')
    }

    return types.map(type => `<dfn>${typeValue(type)}</dfn>`).join('')
  }
</script>

<dl class="properties">
  {#each sanitizedData as prop}
    <dt>{prop.name}{prop.required ? '*' : ''}</dt>
    <dd>
      {@html getTypes(prop.attr.types)}
    </dd>
    <dd>{prop.attr.default ? prop.attr.default : ''}</dd>
    <dd>{prop.description ? prop.description : ''}</dd>
  {/each}
</dl>
