module.exports = {
  // Basic formatting
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,

  // Line length and wrapping
  printWidth: 80,

  // Trailing commas
  trailingComma: 'es5',

  // Brackets and spacing
  bracketSpacing: true,
  bracketSameLine: false,

  // Arrow functions
  arrowParens: 'avoid',

  // JSX specific
  jsxSingleQuote: true,

  // End of line
  endOfLine: 'lf',

  // File extensions to format
  overrides: [
    {
      files: '*.json',
      options: {
        singleQuote: false,
      },
    },
  ],
};
