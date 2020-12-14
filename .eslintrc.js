module.exports = {
  env: {
    es2021: true,
  },
  extends: [
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.test.ts', '.spec.ts'],
      },
      typescript: {},
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  rules: {
    semi: [2, 'never'],
    'arrow-parens': [2, 'as-needed'],
    'react/jsx-filename-extension': [0, { extensions: ['.jsx', '.tsx'] }],
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'no-use-before-define': [0],
    '@typescript-eslint/no-use-before-define': [2],
    'react/jsx-one-expression-per-line': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'jsx-a11y/no-autofocus': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0,
    'no-continue': 0,
    'no-restricted-syntax': 0,
    'react/no-array-index-key': 0,
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-plusplus': 0,
    'no-nested-ternary': 0,
    'import/no-unresolved': 0,
    'no-console': 0,
  },
  overrides: [
    {
      files: ['*.spec.*', '*.test.*'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
          },
        ],
        'no-shadow': 0,
        'max-classes-per-file': 0,
      },
    },
    {
      files: ['*.d.ts'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
          },
        ],
        'no-unused-vars': 0,
        'no-undef': 0,
        'no-bitwise': 0,
        'max-classes-per-file': 0,
      },
    },
  ],
}
