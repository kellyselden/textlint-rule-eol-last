'use strict';

const TextLintTester = require('textlint-tester');
const tester = new TextLintTester();
const rule = require('../src');

tester.run('eol-last', rule, {
  valid: [
    {
      text: ''
    },
    {
      text: `foo
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
      text: 'foo',
      errors: [{
        message: 'Newline required at end of file but not found.',
        line: 1,
        column: 4
      }],
      output: `foo
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
