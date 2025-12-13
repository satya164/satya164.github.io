import next from '@next/eslint-plugin-next';
import { defineConfig, globalIgnores } from 'eslint/config';
import { react, recommended } from 'eslint-config-satya164';
import sort from 'eslint-plugin-simple-import-sort';

export default defineConfig([
  recommended,
  react,

  globalIgnores([
    '**/node_modules/',
    '**/out/',
    '**/.next/',
    '**/.yarn/',
    '**/.vscode/',
    'next-env.d.ts',
  ]),

  {
    plugins: {
      'simple-import-sort': sort,
      '@next/next': next,
    },

    rules: {
      ...next.configs.recommended.rules,

      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
]);
