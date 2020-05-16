module.exports = {
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },

  plugins: ['svelte3'],
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
    },
    {
      files: ['**/*.spec.js', '**/test-utils/**/*'],
      env: {
        jest: true,
      },
      // Can't extend in overrides: https://github.com/eslint/eslint/issues/8813
      plugins: ['jest'],
      rules: {
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
      },
    },
  ],
  rules: {
    'no-unused-vars': 1,
  },
  globals: {
    Phaser: true,
  },
}
