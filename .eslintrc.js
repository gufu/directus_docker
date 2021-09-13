module.exports = {
  root: true,
  env: {
    browser: true,
    jest: true,
    node: true,
    es6: true
  },
  globals: {
    env: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2020
  },
  plugins: [
    'vue'
  ],
  extends: [
    '@nuxtjs',
    'eslint:recommended',
    'plugin:nuxt/recommended',
    'plugin:vue/recommended'
  ],
  rules: {
    'import/order': 'warn',
    'vue/html-indent': ['error', 2, {
      attribute: 1,
      baseIndent: 1,
      closeBracket: 0,
      alignAttributesVertically: true,
      ignores: [
        'VElement[name=span].children'
      ]
    }],
    'vue/max-attributes-per-line': ['error', {
      singleline: 7,
      multiline: {
        max: 1,
        allowFirstLine: true
      }
    }],
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'always'
    }],
    'vue/mustache-interpolation-spacing': ['error', 'always'],
    'vue/html-closing-bracket-spacing': ['error', {
      selfClosingTag: 'never'
    }],
    'vue/singleline-html-element-content-newline': 'off',
    'nuxt/no-cjs-in-config': 'off',
    // 'cci-dev/vue-html-require-data-automation-id': ['error'],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'warn',
      'never'
    ],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-return-await' : 'off',
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always'
    }],
  }
}
