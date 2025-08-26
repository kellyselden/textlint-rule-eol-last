'use strict';

function reporter(context, {
  newline = 'always',
}) {
  let {
    Syntax,
    getSource,
    report,
    RuleError,
    fixer,
  } = context;

  return {
    [Syntax.Document](node) {
      let text = getSource(node);

      if (!text) {
        return;
      }

      let match = text.match(/\r?\n$/m);

      if (newline === 'always' && !match) {
        report(node, new RuleError('Newline required at end of file but not found.', {
          index: text.length,
          fix: fixer.replaceTextRange([text.length, text.length], `
`),
        }));
      }

      if (newline === 'never' && match) {
        report(node, new RuleError('Newline not allowed at end of file.', {
          index: match.index,
          fix: fixer.replaceTextRange([match.index, match.index + match[0].length], ''),
        }));
      }
    },
  };
}

module.exports = {
  linter: reporter,
  fixer: reporter,
};
