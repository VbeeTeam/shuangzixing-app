module.exports = {
	root: true,
	env: {
		node: true,
		jquery:true
	},
	'extends': [
		'plugin:vue/essential',
		'eslint:recommended'
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		"generator-star-spacing": "off",
		"no-tabs": "off",
		"no-unused-vars": "off",
		"no-irregular-whitespace": "off",

	},
	parserOptions: {
		parser: 'babel-eslint'
	}
}
