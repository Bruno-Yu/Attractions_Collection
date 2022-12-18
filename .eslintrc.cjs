/* eslint-env node */

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
        extensions: ['.js', '.vue'],
      },
    },
    'import/core-modules': [
      'vite',
      '@vitejs/plugin-vue',
    ],
  },
  rules: {
    'vuejs-accessibility/label-has-for': [
      'off',
      {
        components: ['VLabel'],
        controlComponents: ['VInput'],
        required: {
          some: ['id'],
        },
        allowChildren: true,
      },
    ],
    'no-param-reassign': [2, { props: false }],
    'max-len': ['off', { code: 150 }],
  },
};
