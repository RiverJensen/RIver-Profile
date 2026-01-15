module.exports = {
  root: true,
  env: { 
    browser: true, 
    es2020: true,
    node: true, // Add Node.js environment for server files
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Allow unused vars prefixed with _
  },
  overrides: [
    {
      // Server-side files
      files: ['server/**/*.js', 'database/**/*.js'],
      env: { node: true, browser: false },
    },
  ],
}
