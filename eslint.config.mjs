import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    ignores: ['secrets/generate-keys.js', 'build/', 'dist/', 'node_modules/'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: { globals: globals.browser },
    ignores: ['secrets/generate-keys.js', 'build/', 'dist/', 'node_modules/'],
  },
  tseslint.configs.recommended,
]);
