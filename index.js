'use strict';

module.exports = {
  rules: {
    // Be wary of Automatic Semicolon Insertion
    semi: 'error',
    // Remember Type Coercion rules while dealing with assignment operators
    eqeqeq: ['warn', 'always', {null: 'ignore'}],
    // Type Checks
    'valid-typeof': ['error', {'requireStringLiterals': true}],
    // eval is Evil
    'no-eval': 'error',
    // Do not use the Function constructor
    'no-new-func': 'error',
    // Do not pass strings to setTimeout or setInterval
    'no-implied-eval': 'error',
    // Prefer [] instead of new Array()
    'no-array-constructor': 'warn',
    // Prefer {} instead of new Object()
    'no-new-object': 'warn',
    // Use braces for all control structures even with one-line statements
    curly: 'error',
    // XXX - Optimize and efficient code
    // Switch Statement -- no fall through
    'no-fallthrough': 'error',
    'no-continue': 'warn',
    // XXX - Avoid Continue
    // Avoid With
    'no-with': 'error',
    // Avoid Comma Operator
    'no-sequences': 'error',
    // Avoid Empty catch blocks
    'no-empty': 'error',
    // Avoid Void
    'no-void': 'error',
    // Avoid Modifying builtin Objects
    'no-extend-native': 'error',
    // FIXME - Avoid modifying objects you don't own
    // Avoid mixing quotes Quotes -- this is style issue
    quotes: ['error', 'single', {
      avoidEscape: true,
      allowTemplateLiterals: true
    }],
    // Avoid Global Variables particularly implied one's
    'no-implicit-globals': 'warn',
    'guard-for-in': 'warn',
    // Beware of parseInt misuse
    'radix': 'warn',
    // XXX - + Operator misuse
    // XXX - Floating Point Mistakes

    /**
     * Best Practices related with Styling and Naming
     */

    // Variables
    //// Do not assign to undeclared identifiers
    'no-undef': 'error',

    // WhiteSpace
    //// Never mix spaces and tabs
    'no-mixed-spaces-and-tabs': 'error',
    //// No whatespace at the end of line or on blank lines
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
    //// Be clear and consistent with their return type
    'consistent-return': 'error',

  }
};
