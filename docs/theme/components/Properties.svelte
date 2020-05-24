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

  const phaserDefaultValueRegExp = /#phaserDefault\s(.*)/
  const requiredRegExp = /#required/
  $: sanitizedData = data
    .map(prop => {
      // optional props in our components will often be explicitly set to `undefined`
      // so that we can let phaser decide what the defaults are when it eventually receives
      // the value. However, they still get parsed as "required" props here,
      // so we'll look for a special #required text in the description to determine if it
      // actually is required
      const required =
        !prop.attr.default &&
        prop.description &&
        prop.description.match(requiredRegExp)

      // we also still want to show the default values that phaser will use in our docs
      const phaserDefault =
        prop.description && prop.description.match(phaserDefaultValueRegExp)

      // and then we'll remove the # tags from the description
      const description =
        prop.description &&
        prop.description
          .replace(requiredRegExp, '')
          .replace(phaserDefaultValueRegExp, '')

      return {
        ...prop,
        attr: {
          ...prop.attr,
          default: prop.default || (phaserDefault && phaserDefault[1]),
        },
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

      if (typeof type === 'string') {
        const trimmed = type.trim()
        if (trimmed.startsWith('Phaser.')) {
          return getPhaserDocsPathForType(trimmed)
        }

        return trimmed
      }

      return type.map(v => {
        if (v.trim().startsWith('Phaser.')) {
          return `<i>${getPhaserDocsPathForType(v)}</i>`
        }

        return `<i>${v}</i>`
      })
    }

    return types.map(type => `<dfn>${typeValue(type)}</dfn>`).join('')
  }

  /**
   * Return a link to the phaser 3 docs page for the Phaser class
   */
  function getPhaserDocsPathForType(type) {
    const sanitizedType = type.replace(/\[\]/gi, '')
    if (sanitizedType.startsWith('Phaser.Types')) {
      const split = sanitizedType.split('.')
      const anchor = split.pop() // last word is the #anchor on the page
      const path = split.join('.') // up to to the last . is the url path

      return `<a href="https://photonstorm.github.io/phaser3-docs/${path}.html#.${anchor}__anchor">${type}</a>`
    } else {
      return `<a href="https://photonstorm.github.io/phaser3-docs/${sanitizedType}.html">${type}</a>`
    }
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
