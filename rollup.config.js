import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import sourcemap from 'rollup-plugin-sourcemaps';

export default {
  input: 'build/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    sourcemap: 'inline',
  },
  plugins: [
    resolve(),
    commonjs({
      namedExports: {
        react: ['useState', 'createContext'],
      },
    }),
    replace({
      'process.env.NODE_ENV': '""'
    }),
    sourcemap(),
  ],
};
