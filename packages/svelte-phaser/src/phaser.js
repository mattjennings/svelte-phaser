import * as Phaser from 'phaser'

// "module.exports = Phaser" in phaser is very problematic. Rollup
// works when we use `Phaser.default`, but our tests only work if we use `Phaser`,
// so this keeps both happy at the cost of... this nastiness
export default typeof window !== 'undefined' ? Phaser.default : Phaser
