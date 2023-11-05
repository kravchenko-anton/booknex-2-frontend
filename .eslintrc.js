module.exports = {
	parser: '@typescript-eslint/parser',

	plugins: [
		'@typescript-eslint/eslint-plugin',
		'sonarjs',
		'unicorn',
		'react-native',
		'jsx-a11y',
		'jsx-expressions'
	],
	extends: [
		'eslint:recommended',
		'airbnb-typescript',
		'airbnb-typescript/base',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/strict',
		'plugin:@typescript-eslint/strict-type-checked',
		'plugin:@typescript-eslint/stylistic-type-checked',
		'plugin:@typescript-eslint/stylistic',
		'plugin:jsx-a11y/recommended',
		'plugin:sonarjs/recommended',
		'plugin:unicorn/all',
		'plugin:react-native/all',
		'plugin:react-hooks/recommended'
	],
	root: true,
	env: {
		node: true
	},
	ignorePatterns: [
		'.eslintrc.js',
		'*.js',
		'./src/screens/reading/epub-reader/**'
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module'
	},
	rules: {
		'no-dupe-keys': 'error',
		'no-dupe-class-members': 'error',
		'no-duplicate-case': 'error',
		'@typescript-eslint/no-non-null-assertion': 'warn',
		'@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
		'@typescript-eslint/consistent-type-imports': 'error',
		'@typescript-eslint/no-duplicate-enum-values': 'error',
		'@typescript-eslint/no-duplicate-type-constituents': 'error',
		'@typescript-eslint/no-empty-interface': 'error',
		'@typescript-eslint/no-explicit-any': 'error',
		'@typescript-eslint/no-extra-non-null-assertion': 'error',
		'max-params': ['error', 4],
		// TODO: enable this rule when it will be fixed
		'arrow-body-style': ['off', 'as-needed'],
		complexity: ['error', 10],
		'no-nested-ternary': 'error',
		'no-unneeded-ternary': 'error',
		// 'no-ternary': 'error',
		'jsx-expressions/strict-logical-expressions': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'react-native/no-unused-styles': 2,
		'react-native/split-platform-components': 2,
		'react-native/no-inline-styles': 1,
		'react-native/no-color-literals': 2,
		'react-native/no-single-element-style-arrays': 2,
		'max-len': [
			'error',
			{ code: 200, ignoreTemplateLiterals: true, ignoreUrls: true }
		],
		'no-param-reassign': ['error', { props: false }],
		'no-restricted-syntax': [
			'error',
			'ForInStatement',
			'LabeledStatement',
			'WithStatement'
		],
		'no-underscore-dangle': ['error', { allow: [] }],
		'no-void': ['error', { allowAsStatement: true }],
		'spaced-comment': [
			'error',
			'always',
			{ line: { markers: ['*package', '!', ',', ' '] } }
		],
		'@typescript-eslint/lines-between-class-members': [
			'error',
			'always',
			{ exceptAfterSingleLine: true }
		],
		'sonarjs/cognitive-complexity': 'error',
		'sonarjs/no-identical-expressions': 'error',
		'@typescript-eslint/naming-convention': [
			'error',
			{ selector: 'default', format: null },
			{
				selector: 'variable',
				format: null,
				types: ['boolean', 'string', 'number']
			},
			{
				selector: 'variableLike',
				format: ['camelCase', 'PascalCase', 'UPPER_CASE']
			},
			{ selector: 'parameter', format: null },
			{ selector: 'memberLike', format: ['camelCase', 'PascalCase'] },
			{ selector: 'typeLike', format: ['PascalCase'] },
			{ selector: 'property', format: null },
			{ selector: 'enumMember', format: null }
		],
		'unicorn/filename-case': [
			'error',
			{
				case: 'kebabCase',
				ignore: ['App.tsx', 'use']
			}
		],
		'unicorn/no-keyword-prefix': [
			'error',
			{ disallowedPrefixes: ['new', 'class'] }
		],
		'@typescript-eslint/no-confusing-void-expression': 'off',
		'@typescript-eslint/comma-dangle': 'off',
		'@typescript-eslint/semi': 'off',
		'@typescript-eslint/unbound-method': 'off',
		'@typescript-eslint/no-misused-promises': 'off',
		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': 'off',
		'@typescript-eslint/no-floating-promises': 'off',
		'@typescript-eslint/indent': 'off',
		'@typescript-eslint/no-extraneous-class': 'off',
		'@typescript-eslint/consistent-type-assertions': 'off',
		'@typescript-eslint/no-unsafe-member-access': 'off',
		'@typescript-eslint/no-unnecessary-condition': 'off',
		'@typescript-eslint/consistent-type-definitions': 'off',
		'@typescript-eslint/prefer-nullish-coalescing': 'off',
		'@typescript-eslint/no-throw-literal': 'off',
		'import/no-extraneous-dependencies': 'off',
		'import/extensions': 'off',
		'import/named': 'off',
		'import/no-default-export': 'off',
		'import/prefer-default-export': 'off',
		'no-mixed-spaces-and-tabs': 'off',
		'class-methods-use-this': 'off',
		'consistent-return': 'off',
		'newline-per-chained-call': 'off',
		'no-await-in-loop': 'off',
		'no-continue': 'off',
		'react-native/no-raw-text': 'off',
		'unicorn/no-null': 'off',
		'react/jsx-filename-extension': 'off'
	}
}
