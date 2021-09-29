module.exports = {
  root: true,    
  parserOptions: {
      sourceType: 'module'
  },
  parser: 'babel-eslint',
  env: {
      browser: true,
  },
  rules: {
      "indent": ["error", 2],
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "no-console": "error",
      "arrow-parens": 0
  },
  extends: 'eslint:standard',
}