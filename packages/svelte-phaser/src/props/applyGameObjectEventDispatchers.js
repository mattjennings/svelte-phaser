export function applyGameObjectEventDispatchers(
  instance,
  dispatch,
  extraEvents = []
) {
  const createEventHandler = event => {
    const callback = (...args) => dispatch(event, args)

    instance.on(event, callback)

    return () => instance.off(event, callback)
  }

  const listeners = [
    createEventHandler('drag'),
    createEventHandler('dragend'),
    createEventHandler('dragenter'),
    createEventHandler('dragleave'),
    createEventHandler('dragover'),
    createEventHandler('dragstart'),
    createEventHandler('drop'),
    createEventHandler('pointerdown'),
    createEventHandler('pointermove'),
    createEventHandler('pointerout'),
    createEventHandler('pointerover'),
    createEventHandler('pointerup'),
    createEventHandler('pointerwheel'),
    ...extraEvents.map(ev => createEventHandler(ev)),
  ]

  // is this necessary? do gameobjects clean this up when they destroy?
  return () => listeners.forEach(listener => listener())
}
