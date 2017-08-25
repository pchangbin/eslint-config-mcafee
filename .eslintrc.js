'use strict';

module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 8,
  },
  rules: {
    indent:             [ 'error', 2 , {SwitchCase: 1}],
    'linebreak-style':  [ 'error', 'unix' ],
    quotes:             [ 'error', 'single', {avoidEscape: true} ],
    semi:               [ 'error', 'always' ],
    'no-console':       'off',
    'no-unused-vars':   'warn',
  }
};
