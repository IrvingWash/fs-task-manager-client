module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		tsconfigRootDir : __dirname, 
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: [
		'plugin:@typescript-eslint/recommended',
	],
	root: true,
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'@typescript-eslint/explicit-function-return-type': ['error'],
		'@typescript-eslint/explicit-module-boundary-types': ['error'],
		'@typescript-eslint/no-explicit-any': ['error'],
		'eol-last': ['error'],
		'semi': ['error'],
		'object-curly-spacing': ['error', 'always'],
		'comma-dangle': ['error', 'always-multiline'],
		'@typescript-eslint/explicit-member-accessibility': ['error'],
		'@typescript-eslint/no-empty-interface': ['off'],
	},
};