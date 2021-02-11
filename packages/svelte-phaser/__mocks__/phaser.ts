/**
 * `import Phaser from 'phaser'` does not work right in our tests,
 * so while this isn't a mock, it fixes the import
 */
import * as Phaser from 'phaser'

export default Phaser
