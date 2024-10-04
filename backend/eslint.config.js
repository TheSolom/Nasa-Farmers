import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
    js.configs.recommended,
    prettier,
    {
        files: ['**/*.js', '**/*.ts', 'src/**/*'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
            }
        },
        rules: {
            'no-console': 'warn',
            'prefer-destructuring': ['error', { 'object': true, 'array': false }],
            'no-unused-vars': ['warn', { 'argsIgnorePattern': 'req|res|next' }],
            'eqeqeq': ['error', 'always'],
            'curly': ['error', 'all'],
            'semi': ['error', 'always'],
            'quotes': ['error', 'single', { 'avoidEscape': true }],
            'no-magic-numbers': ['warn', { 'ignore': [0, 1] }],
            'max-lines': ['warn', { 'max': 300, 'skipBlankLines': true, 'skipComments': true }],
            'no-undef': 'error',
            'no-shadow': 'error',
            'prefer-const': 'error',
            'callback-return': 'error',
        },
    },
];
