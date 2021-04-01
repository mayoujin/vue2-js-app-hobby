module.exports = {
  root: true,

  env: {
    node: true,
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
  },

  plugins: ['vue'],

  // add your custom rules here
  rules: {
    // allow console.log during development only
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    /* Custom VueJS */
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: true,
      },
    ],

    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 3,
        multiline: {
          max: 3,
          allowFirstLine: true,
        },
      },
    ],
    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/component-name-in-template-casing.md
    'vue/html-indent': [
      'warn',
      2,
      {
        attribute: 3,
        closeBracket: 0,
        ignores: [],
      },
    ],
    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/script-indent.md
    'vue/script-indent': [
      'warn',
      2,
      {
        baseIndent: 0,
        switchCase: 0,
        ignores: [],
      },
    ],
  },

  extends: ['plugin:vue/recommended', '@vue/prettier', '@vue/typescript'],
}
