
module.exports = {
  extends: ['prettier'],
  plugins: ['babel', 'react-hooks'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module',
  },
  env: {
    jest: true,
  },
  globals: {

    window: true,
    document: true,
    localStorage: true,
  },
  rules: {
    'import/no-absolute-path': 0,
    'global-require': 0,
    'no-useless-catch': 0,
    'lines-between-class-members': 0,
    'eol-last': 'error',
    'react/prop-types': "off", // disable as I use TypeScript for type checking
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'react/jsx-props-no-spreading': 0,
    'react/destructuring-assignment': 0,
    'react/button-has-type': 0,
    'react/jsx-first-prop-new-line': [1, 'multiline'],
    'react/jsx-closing-bracket-location': [1, 'tag-aligned'],
    'react/jsx-max-props-per-line': [
      1,
      {
        maximum: 3,
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.tsx'],
      },
    ],
    'react/jsx-tag-spacing': 1,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['./src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
