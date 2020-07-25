import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {
	terser
} from 'rollup-plugin-terser';
import pkg from './package.json';

const banner = `/*!
 * ` + pkg.name + `
 * http://chartjs.org/
 * Version: ` + pkg.version + `
 *
 * Copyright ` + (new Date().getFullYear()) + ` Neckster
 * Released under the MIT license
 * https://github.com/Neckster/` + pkg.name + `/blob/master/LICENSE
 */`;

export default [
	// browser-friendly (minified) UMD build
	{
		input: 'src/plugin.js',
		output: {
			name: pkg.name,
			file: pkg.main,
			banner,
			format: 'umd',
			globals: {
				'chart.js': 'Chart'
			},
		},
		external: [
			'chart.js'
		],
		plugins: [
			resolve(),
			commonjs(),
			terser()
		]
	},
	// node js and module version
	{
		input: 'src/plugin.js',
		external: [
			'chart.js'
		],

		output: [
			{
				file: pkg.module,
				banner,
				format: 'es',
				globals: {
					'chart.js': 'Chart'
				},
			}
		]
	}
];
