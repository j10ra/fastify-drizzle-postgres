module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-explicit-any': 'warn',
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'global-require': 0,
    'import/prefer-default-export': 0,
    'no-restricted-syntax': 0,
    'no-unused-expressions': 0,
    'no-return-await': 0,
    'no-constructor-return': 0,
    'class-methods-use-this': 0,
  },
};
