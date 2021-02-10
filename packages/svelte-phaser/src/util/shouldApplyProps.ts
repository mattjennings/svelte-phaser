/**
 * Returns true if any of the values are not undefined
 */
export function shouldApplyProps(...args: any[]) {
  for (const arg of args) {
    if (typeof arg !== 'undefined') {
      return true
    }
  }

  return false
}
