const datauri = require('datauri')

//@ts-ignore
global.focus = jest.fn()

//@ts-ignore
global.URL.createObjectURL = function (blob) {
  if (blob) {
    return datauri.format(
      blob.type,
      blob[Object.getOwnPropertySymbols(blob)[0]]._buffer
    ).content
  }
}
//@ts-ignore
global.URL.revokeObjectURL = function () {
  // Do nothing at the moment
}
