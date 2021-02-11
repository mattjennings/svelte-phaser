module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testRegex: 'src/.*.spec.ts',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.svelte$': ['svelte-jester', { preprocess: true }],
  },
  moduleFileExtensions: ['js', 'ts'],
  setupFiles: ['./src/test-utils/setup.ts'],
  testEnvironmentOptions: {
    runScripts: 'dangerously',
    resources: 'usable',
    pretendToBeVisual: true,
  },
}
