/*
 * @Author: shen
 * @Date: 2022-09-20 10:52:27
 * @LastEditors: shen
 * @LastEditTime: 2022-09-20 10:54:01
 * @Description:
 */
// commitlint uses `ts-node` to load typescript config, it's too slow. So we replace it with `esbuild`.
require('@esbuild-kit/cjs-loader')
module.exports = require('./commitlint.config.ts').default
