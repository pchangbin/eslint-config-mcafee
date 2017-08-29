'use strict';

module.exports = {
  rules: {
    semi: 'error',
    eqeqeq: ['warn', 'always', {null: 'ignore'}],
    'valid-typeof': ['error', {'requireStringLiterals': true}],
    'no-eval': 'error',
    'no-new-func': 'error',
    'no-implied-eval': 'error',
    'no-array-constructor': 'warn',
    'no-new-object': 'warn',
    curly: 'error',
    'no-fallthrough': 'error',
    'no-continue': 'warn',
    'no-with': 'error',
    'no-sequences': 'error',
    'no-empty': 'error',
    'no-void': 'error',
    'no-extend-native': 'error',
    quotes: ['error', 'single', {
      avoidEscape: true,
      allowTemplateLiterals: true
    }],
    'no-implicit-globals': 'warn',
    'guard-for-in': 'warn',
    'radix': 'warn',
    'no-undef': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-trailing-spaces': 'error',
    // Method
    /**
     * XXX - Avoid methods that do too much or have side effects.
    'complexity': ['error', 20],
    'max-depth': ['warn', 4],
    'max-len': ['error', 80],
    'max-lines': ['warn', 300],
    'max-nested-callbacks': ['warn', 10],
    'max-statements': ['warn', 20],
    */
    /**
     * XXX - Avoid long parameter lists.
    'max-params': ['error', 3],
    */
    'consistent-return': 'error',
  }
};
