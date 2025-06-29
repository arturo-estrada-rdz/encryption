import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const ignores = [
  'secrets/generate-keys.js',
  'generated/swagger-generate.js',
  'build/',
  'dist/',
  'node_modules/',
];

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    ignores,
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: { globals: globals.browser },
    ignores,
  },
  tseslint.configs.recommended,
]);
