module.exports = {
  extends: ['plugin:react/recommended', 'plugin:jest/recommended', 'standard', 'standard-jsx'],
  plugins: [
    'react',
    '@typescript-eslint',
    'jest'
  ],
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: false
      }
    ],
    'arrow-parens': ['error', 'always'],
    'require-await': 'error',
    '@typescript-eslint/type-annotation-spacing': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    ],
    'react/jsx-sort-props': 'error'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true
  },
  settings: {
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      webpack: {
        config: require.resolve('./.erb/configs/webpack.config.eslint.js')
      }
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    }
  },
  globals: {
    JSX: 'readonly'
  }
}
