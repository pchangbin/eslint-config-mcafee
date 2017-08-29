'use strict';

const assert = require('assert');
const {ok, strictEqual} = assert;

// Be wary of Automatic Semicolon Insertion
describe('AIS', function() {
  /* eslint-disable */
  function aisError() {
    return
    {
      javascript: "This is Bad"
    }
  }
  /* eslint-enable */
  before(function() {
    strictEqual(aisError(), undefined);
  });

  const expectedError = 'Missing semicolon.';
  it('makes error', function() {
    ok(errorsFromFunc(aisError).includes(expectedError));
  });
});

// Remember Type Coercion rules while dealing with assignment operators
describe('Operator "=="', function() {
  const expectedErr = "Expected '===' and instead saw '=='.";
  it('is allowed with null', function() {
    function sample() {
      return 'foo' == null;
    }
    strictEqual(errorsFromFunc(sample).length, 0);
  });
  it('is not allowed', function() {
    function sample() {
      return 'foo' == 'bar';
    }
    ok(errorsFromFunc(sample).includes(expectedErr));
  });
});

// Type Checks - Reference list
describe('typeof', function() {
  const expectedErr = 'Invalid typeof comparison value.';
  describe('<string>', function() {
    it('is only compared with "string"', function() {
      strictEqual(errorsFromSrc("typeof 'foo' === 'string';").length, 0);
      ok(errorsFromSrc("typeof 'foo' === 'String';").includes(expectedErr));
    });
  });

  describe('<number>', function() {
    it('is only compared with "number"', function() {
      strictEqual(errorsFromSrc("typeof 1 === 'number';").length, 0);
      ok(errorsFromSrc("typeof 1 === 'Number';").includes(expectedErr));
    });
  });

  describe('<boolean>', function() {
    it('is only compared with "boolean"', function() {
      strictEqual(errorsFromSrc("typeof true === 'boolean';").length, 0);
      strictEqual(errorsFromSrc("typeof false === 'boolean';").length, 0);
      ok(errorsFromSrc("typeof true === 'Boolean';").includes(expectedErr));
      ok(errorsFromSrc("typeof false === 'Boolean';").includes(expectedErr));
    });
  });

  describe('<object>', function() {
    it('is only compared with "number"', function() {
      strictEqual(errorsFromSrc("typeof {} === 'string';").length, 0);
      ok(errorsFromSrc("typeof {} === 'String';").includes(expectedErr));
    });
  });
});

// eval is Evil
describe('Execute source from string', function() {
  describe('eval', function() {
    const expectedErr = 'eval can be harmful.';
    it('is not allowed', function() {
      ok(errorsFromSrc('eval("");').includes(expectedErr));
    });
  });
  // Do not use the Function constructor
  describe('Function constructor', function() {
    const expectedErr = 'The Function constructor is eval.';
    it('is not allowed', function() {
      ok(errorsFromSrc(`Function('console.log("foo");');`).includes(expectedErr));
      ok(errorsFromSrc(`new Function('console.log("foo");');`).includes(expectedErr));
    });
  });

  // Do not pass strings to setTimeout or setInterval.
  describe('setTimeout and setInterval', function() {
    const expectedErr =
      'Implied eval. Consider passing a function instead of a string.';
    it("don't accept string as first argument", function() {
      strictEqual(errorsFromSrc('setTimeout(function(){}, 100);').length, 0);
      strictEqual(errorsFromSrc(`setInterval(function(){}, 100);`).length, 0);
      strictEqual(errorsFromSrc(`window.setTimeout(function(){}, 100);`).length, 0);
      strictEqual(errorsFromSrc(`window.setInterval(function(){}, 100);`).length, 0);

      ok(errorsFromSrc(`setTimeout('', 100);`).includes(expectedErr));
      ok(errorsFromSrc(`setInterval('', 100);`).includes(expectedErr));
      ok(errorsFromSrc(`window.setTimeout('', 100);`).includes(expectedErr));
      ok(errorsFromSrc(`window.setInterval('', 100);`).includes(expectedErr));
    });
  });
});

// Prefer [] instead of new Array() Constructor and Prefer {} instead of new
// Object()
describe('Constructor', function() {
  describe('Array', function() {
    const expectedErr = 'The array literal notation [] is preferrable.';
    it('is allowed for empty array with specified length', function() {
      strictEqual(errorsFromSrc('new Array(10);').length, 0);
    });
    it('is not allowed for static array', function() {
      ok(errorsFromSrc('new Array;').includes(expectedErr));
      ok(errorsFromSrc('new Array();').includes(expectedErr));
      ok(errorsFromSrc('new Array(1,2,3,4);').length, 0);
    });
  });
  describe('Object', function() {
    const expectedErr = 'The object literal notation {} is preferrable.';
    it('is not allowed', function() {
      ok(errorsFromSrc('new Object;').includes(expectedErr));
      ok(errorsFromSrc('new Object();').includes(expectedErr));
      ok(errorsFromSrc('new Object(null);').includes(expectedErr));
      ok(errorsFromSrc('new Object(undefined);').includes(expectedErr));
      ok(errorsFromSrc('new Object({});').includes(expectedErr));
    });
  });
});

// Use braces for all control structures even with one-line statements
describe('Braces is forced for all control structures', function() {
  it('like if/else statements', function() {
    ok(errorsFromSrc('if (this.foo) this.foo();').includes(
      "Expected { after 'if' condition."));
    ok(errorsFromSrc('if (this.foo) {} else this.foo();').includes(
      "Expected { after 'else'."));

  });

  it('like while statements', function() {
    ok(errorsFromSrc('while (this.foo.length) this.foo.pop();').includes(
      "Expected { after 'while' condition."));
  });

  it('like for statements', function() {
    ok(errorsFromSrc('for(;;) this.loop();').includes(
      "Expected { after 'for' condition."));
    ok(errorsFromSrc('for(const p in this) p;').includes(
      "Expected { after 'for-in'."));
    ok(errorsFromSrc('for(const p of this) p;').includes(
      "Expected { after 'for-of'."));
  });
});

// switch Statement
describe('switch/case statement', function() {
  it('accepts fall through only when marked with comment', function() {
    ok(errorsFromSrc('switch(1){case 1:;default:;}').includes(
      "Expected a 'break' statement before 'default'."));
    strictEqual(0,
      errorsFromSrc('switch(1) {case 1:;/*fallthrough*/default:;}').length);
  });
});

// Avoid Continue
describe('"continue"', function() {
  it('is warned', function() {
    ok(errorsFromSrc('while(true) {continue;}').includes(
      'Unexpected use of continue statement.'));
  });
});

// Avoid With
describe('"with"', function() {
  it('is not allowed', function() {
    ok(errorsFromSrc('with(document){body;}').includes(
      "Unexpected use of 'with' statement."));
  });
});

// Avoid Comma Operator
describe('Comma operator', function() {
  it('is not allowed', function() {
    ok(errorsFromSrc('let a;a=1,2;').includes(
      'Unexpected use of comma operator.'));
  });
  it('is allowed with parenthesis', function() {
    strictEqual(errorsFromSrc('let a;a=(1,2);').length, 0);
  });
});

// Avoid Empty catch blocks
describe('Empty catch block', function() {
  it('should be avoided', function() {
    ok(errorsFromSrc('try {;} catch(e) {}').includes(
      'Empty block statement.'));
  });
  it('should have at least comment', function() {
    strictEqual(errorsFromSrc('try {;} catch(e) {/**/}').length, 0);
  });
});

// FIXME : Do not use Non-standard features
describe.skip('Non-standard features', function() {
});

// Avoid void
describe('void', function() {
  it('is not allowed', function() {
    ok(errorsFromSrc('(function(){return void 0;});').includes(
      "Expected 'undefined' and instead saw 'void'."));
  });
});

// Avoid Modifying builtin objects
describe('Builtin objects', function() {
  it('should not be modified', function() {
    ok(errorsFromSrc('Object.prototype.foo = Object;').includes(
      'Object prototype is read only, properties should not be added.'));
  });
});

// FIXME - Avoid modifying objects you don't own.
describe.skip("Avoid modifying objects you don't own.", function() {
});

// Avoid mixing quotes Quotes
describe('Quotation', function() {
  const expectedErr = 'Strings must use singlequote.';
  it('is preferred with single quote', function() {
    strictEqual(errorsFromSrc("'foo';").length, 0);
    ok(errorsFromSrc('"foo";').includes(expectedErr));
  });
  it('with double quote is allowed to avoid escaping', function() {
    ok(errorsFromSrc(`"it is escaped string";`).includes(expectedErr));

    strictEqual(errorsFromSrc(`'it\\'s escaped string';`).length, 0);
    strictEqual(errorsFromSrc(`"it's escaped string";`).length, 0);
    strictEqual(errorsFromSrc(`"'foo'";`).length, 0);
  });
  it('with backtick is allowed', function() {
    strictEqual(errorsFromSrc('`foo`;').length, 0);
  });
});

// Avoid Global Variables particularly implied one's
describe('Implied Global variable', function() {
  it('should be avoided', function() {
    ok(errorsFromSrc('foo = 1;').includes(
      'Implicit global variable, assign as global property instead.'));
  });
});

// Understand for..in misuse
describe('for-in statement', function() {
  it('must have if statement to filter own properties', function() {
    ok(errorsFromSrc('for(let p in window) {window.p;}').includes([
      'The body of a for-in should be wrapped in an if statement ',
      'to filter unwanted properties from the prototype.'].join('')));
    strictEqual(errorsFromFunc(
      function properUsecase() {
        for (let p in window) {
          if (Object.prototype.hasOwnProperty.call(window, p)) {
            window.p;
          }
        }
      }).length, 0);
  });
});

// Beware of parselint misuse
describe('parseInt', function() {
  it('required radix parameter', function() {
    ok(errorsFromSrc("parseInt('018');").includes('Missing radix parameter.'));
  });
});

// FIXME : + Operator misuse
describe.skip('+ operator', function() {
});

// FIXME : Floating Point Mistakes
describe.skip('Floating point', function() {
});

// Variables
describe('Undeclared identifiers', function() {
  it('can not be assigned', function() {
    ok(errorsFromSrc('function foo(){bar = 1;}').includes(
      "'bar' is not defined."));
  });
});

// WhiteSpace
describe('Whitespace', function() {
  it('with mixed space and tabs is not allowed', function() {
    ok(errorsFromSrc('  	;').includes('Mixed spaces and tabs.'));
  });
  it('is not allowed at the end of line', function() {
    ok(errorsFromSrc(';  ').includes('Trailing spaces not allowed.'));
  });
});


/******************************************************************************
 * Utility functions
 */
const {CLIEngine} = require('eslint');
const conf = require('..');

const eslint = new CLIEngine({
  useEslintrc: false,
  envs: ['node', 'browser', 'es6'],
  parserOptions: {
    ecmaVersion: 2016,
  },
  rules: conf.rules
});

function errorsFromFunc(aFunc) {
  if (!(aFunc instanceof Function)) {
    throw new TypeError('Not a function');
  }

  const src = aFunc.toString();
  if (src.includes('[native code]')) {
    throw new TypeError('Native Function');
  }

  return errorsFromSrc(src);
}

function errorsFromSrc(aSrc) {
  const errors = [];
  Object.defineProperty(errors, "log", {
    value: (function() {
      console.log(this);
    }).bind(errors)
  });
  const report = eslint.executeOnText(aSrc);
  report.results.forEach(result => {
    result.messages.forEach(msg => {
      errors.push(msg.message);
    });
  });

  return errors;
}
