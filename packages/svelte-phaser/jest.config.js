module.exports = {
  testRegex: 'src/.*.spec.js',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.svelte$': 'svelte-jester',
  },
  moduleFileExtensions: ['js'],
  setupFiles: ['./src/test-utils/setup.js'],
  testEnvironmentOptions: {
    runScripts: 'dangerously',
    resources: 'usable',
    pretendToBeVisual: true,
  },
}
