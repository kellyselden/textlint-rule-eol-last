'use strict';

const TextLintTester = require('textlint-tester');
const tester = new TextLintTester();
const rule = require('../src');

tester.run('eol-last', rule, {
  valid: [
    {
      text: `
`
    },
    {
      text: '',
      options: {
        newline: 'never'
      }
    }
  ],
  invalid: [
    {
      text: '',
      errors: [{
        message: 'Newline required at end of file but not found.',
        line: 1,
        column: 1
      }],
      output: `
`
    },
    {
      text: `
`,
      options: {
        newline: 'never'
      },
      errors: [{
        message: 'Newline not allowed at end of file.',
        line: 1,
        column: 1
      }],
      output: ''
    }
  ]
});
