module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'eslint-plugin-import',
    'prettier'
  ],
  env: {
    browser: true,
    jasmine: true,
    jest: true
  },
  rules: {
    'no-undef': 0,
    semi: ['warn', 'never'],
    'react/prop-types': 0,
    '@typescript-eslint/no-var-requires': 1,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/member-ordering': [
      1,
      {
        default: [
          'public-static-field',
          'public-static-method',
          'protected-static-field',
          'protected-static-method',
          'private-static-field',
          'private-static-method',
          'public-instance-field',
          'protected-instance-field',
          'private-instance-field',
          'public-constructor',
          'protected-constructor',
          'private-constructor',
          'public-instance-method',
          'protected-instance-method',
          'private-instance-method'
        ]
      }
    ],
    '@typescript-eslint/no-object-literal-type-assertion': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-unused-vars': [
      1,
      {
        ignoreRestSiblings: true,
        varsIgnorePattern: '[rR]eact',
        argsIgnorePattern: '^_'
      }
    ],
    'no-extra-boolean-cast': 0,
    'no-undef-init': 1,
    'no-multiple-empty-lines': 1,
    quotes: [1, 'single', 'avoid-escape'],
    '@typescript-eslint/interface-name-prefix': 0,
    'import/order': [
      1,
      {
        groups: [
          ['builtin', 'external', 'internal'],
          ['parent', 'sibling', 'index']
        ],
        'newlines-between': 'always'
      }
    ],
    'sort-keys': 0,
    'arrow-parens': 0,
    'no-console': [1, { allow: ['debug', 'info', 'trace'] }],
    '@typescript-eslint/no-inferrable-types': [1, { ignoreParameters: true }],
    'no-fallthrough': 1,
    'comma-dangle': [1, 'never'],
    '@typescript-eslint/class-name-casing': 1,
    'max-classes-per-file': 2,
    curly: 1,
    'eol-last': 1,
    'valid-jsdoc': 1,
    'no-caller': 1,
    'no-new-wrappers': 1,
    'no-redeclare': 2,
    'no-empty': 1,
    'no-eval': 1,
    '@typescript-eslint/prefer-namespace-keyword': 1,
    'dot-notation': 1,
    'no-unused-expressions': 1,
    'no-var': 1,
    'default-case': 2,
    eqeqeq: [1, 'always', { null: 'ignore' }],
    '@typescript-eslint/type-annotation-spacing': 1,
    camelcase: 1,
    '@typescript-eslint/prefer-interface': 0,
    'no-debugger': 1,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,
    'import/newline-after-import': 1
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    }
  },
  parser: '@typescript-eslint/parser'
}
