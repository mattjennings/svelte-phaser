export function removeUndefined<T extends object>(object: T) {
  return Object.keys(object).reduce((newObject, key) => {
    if (typeof object[key] !== 'undefined') {
      return {
        ...newObject,
        [key]: object[key],
      }
    }

    return newObject
  }, {})
}
