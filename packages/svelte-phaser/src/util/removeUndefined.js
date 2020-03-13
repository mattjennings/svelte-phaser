export function removeUndefined(object) {
  return Object.keys(object).reduce((newObject, key) => {
    if (object[key] !== undefined) {
      return {
        ...newObject,
        [key]: object[key],
      }
    }

    return newObject
  }, {})
}
