/*
 * @Author: shen
 * @Date: 2022-09-20 10:05:06
 * @LastEditors: shen
 * @LastEditTime: 2022-11-04 14:02:25
 * @Description:
 */
module.exports = {
	root: true,
	env: {
		node: true,
		'vue/setup-compiler-macros': true
	},
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/typescript/recommended',
		'prettier',
		'@vue/prettier'
		// "@vue/prettier/@typescript-eslint",
	],
	plugins: ['@typescript-eslint', 'prettier'],
	parserOptions: {
		ecmaVersion: 2020
	},
	rules: {
		'prettier/prettier': 'error',
		'arrow-body-style': 'off',
		'prefer-arrow-callback': 'off',
		'@typescript-eslint/no-explicit-any': ['off'],
		'@typescript-eslint/no-non-null-assertion': 'off',
		'no-empty-function': 'off',
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/no-empty-function': ['off'],
		'vue/multi-word-component-names': 'off',
		allowEmptyCatch: 'off'
	},
	overrides: [
		{
			files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
			env: {
				mocha: true
			}
		},
		{
			files: ['*.vue'],
			parser: 'vue-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
				extraFileExtensions: ['.vue'],
				ecmaVersion: 'latest',
				ecmaFeatures: {
					jsx: true
				}
			},
			rules: {
				'no-undef': 'off'
			}
		}
	],
	globals: {
		defineProps: 'readonly'
	}
}
