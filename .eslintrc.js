module.exports = {
  root: true,
  "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true
      },
      "useJSXTextNode": true,
      "project": "./tsconfig.json",
      "tsconfigRootDir": "."
    },
  extends: [
    '@react-native-community',
    "plugin:@typescript-eslint/recommended",
    'plugin:flowtype/recommended',
  ]
};
