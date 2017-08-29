# eslint-config-mcafee
ESLint [shareable Configs](http://eslint.org/docs/developer-guide/shareable-configs.html) for [McAfee JavaScript Secure Coding Recommentations](https://planet.mcafee.com/people/ssingh7/blog/2017/08/21/javascript-secure-coding-recommendation)

# Installation
```sh
$ npm install --save-dev eslint eslint-config-mcafee
```

# Usage
Once the ```eslint-config-mcafee``` package is installed, you can use it by specifying
```mcafee``` in the extends section of your ESLint configuration.

```javascript
{
  extends: 'mcafee',
  rules: {
    // Additional rules and overrides...
  }
}
```
 * It is strongly recommended with [```eslint:recommended```](http://eslint.org/docs/rules/) like below
```javascript
{
  extends: ['eslint:recommended', 'mcafee'],
  rules: {
    // Additional rules and overrides...
  }
}
```
