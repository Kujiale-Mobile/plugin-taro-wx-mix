const changeAppJsonPlugin = require('./changeAppJsonPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
exports.default = (ctx, options) => {
  ctx.modifyWebpackChain(({ chain }) => {
    chain.plugin('changeAppJsonPlugin').use(changeAppJsonPlugin);
    chain.plugin('CopyWebpackPlugin').use(CopyWebpackPlugin, [[{
      from: path.resolve(ctx.paths.appPath, options.dir),
      to: path.resolve(ctx.paths.outputPath),
      ignore: ['app.js']
    }]]);
  });
};
