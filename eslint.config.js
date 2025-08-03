const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintConfigPrettier = require('eslint-config-prettier');
const pluginReact = require('eslint-plugin-react');
const pluginJs = require('@eslint/js');

module.exports = defineConfig([
  // The base recommended ESLint rules
  pluginJs.configs.recommended,

  // Apply the Expo configuration, which includes a lot of React Native best practices
  expoConfig,

  // Apply a separate configuration for React-specific rules
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      react: pluginReact,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      // Disable react-in-jsx-scope for React 19+ which doesn't require React import
      'react/react-in-jsx-scope': 'off',
      // You can add more rules here if you need to, or override existing ones
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // Prettier must be last to turn off all formatting rules from other configs
  // This is the key to preventing conflicts!
  eslintConfigPrettier,

  // Ignore the 'dist' folder and other build artifacts
  {
    ignores: ['dist/*'],
  },
]);