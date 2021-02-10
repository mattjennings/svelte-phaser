/**
 * Hooks into a phaser event with a svelte dispatcher
 *
 * @param instance - the game object
 * @param dispatch - svelte dispatcher
 * @param event - phaser event to hook in to
 * @param makeArgs - called with the event parameters from phaser. should return an object to send with the svelte dispatcher
 * @returns a function to remove the event listener
 */
export const createPhaserEventDispatcher = <
  T extends Phaser.GameObjects.GameObject
>(
  instance: T,
  dispatch: (type: string, detail: any) => any,
  event: string,
  makeArgs: (...args: any[]) => any
) => {
  const callback = (...args) => dispatch(event, makeArgs(...args))

  instance.on(event, callback)

  return () => instance.off(event, callback)
}
