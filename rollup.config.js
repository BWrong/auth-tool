import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { babel } from '@rollup/plugin-babel';
// import peerDepsExternal from "rollup-plugin-peer-deps-external";
import pkg from './package.json';
const libName = 'authTool';
const banner = `/* libName: ${libName} version: ${pkg.version} author: ${pkg.author} */`;
const config = {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      plugins: [terser()],
      name: libName,
      banner,
      exports: 'auto'
    },
    {
      file: pkg.module,
      format: 'esm',
      name: libName,
      banner,
      exports: 'auto'
    }
  ],
  plugins: [
    // peerDepsExternal(),
    nodeResolve(),
    commonjs({
      ignore: id => {
        console.groupEnd(id)
      }
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled'
    })
  ],
  // external: []

  // globals:{},
};

export default config;
