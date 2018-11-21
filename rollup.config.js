import typescript from 'rollup-plugin-typescript2';
import tsbin from 'typescript';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

import pkg from './package.json';

export default {
  input: 'src/json_form.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    postcss({
      modules: true,
    }),
    url(),
    svgr(),
    babel({
      exclude: 'node_modules/**',
      presets: [["latest", {
        "es2015": {
          "modules": false
        }
      }], "react", "stage-0"],
      plugins: ['external-helpers']
    }),
    resolve({
      extensions: ['.js', '.jsx', '.json'],
    }),
    // typescript({
    //   typescript: tsbin,
    //   rollupCommonJSResolveHack: true,
    //   clean: true,
    //   include: ['src/'],
    // }),
    commonjs(),
  ],
};