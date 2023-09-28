const presets = [
	[
		'@babel/preset-env',
		{
			useBuiltIns: 'entry',
			corejs: '3.32.2',
		},
	],
];

const plugins = [];

module.exports = { presets, plugins };
