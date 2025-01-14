const { name, devDependencies } = require('../package');
const initWebpack = require('./init-webpack');

module.exports = {
  name,
  hooks: {
    create(gasket, context) {
      const { pkg } = context;
      pkg.add('devDependencies', {
        webpack: devDependencies.webpack
      });
    },
    metadata(gasket, meta) {
      return {
        ...meta,
        guides: [{
          name: 'Webpack Configuration Guide',
          description: 'Configuring Webpack in Gasket apps',
          link: 'docs/webpack.md'
        }],
        lifecycles: [{
          name: 'webpackChain (deprecated)',
          method: 'execSync',
          description: 'Setup webpack config by chaining',
          link: 'README.md#webpackChain',
          parent: 'initWebpack'
        }, {
          name: 'webpack (deprecated)',
          method: 'execSync',
          description: 'Modify webpack config with partials or by mutating',
          link: 'README.md#webpack',
          parent: 'initWebpack',
          after: 'webpackChain'
        }, {
          name: 'webpackConfig',
          method: 'execWaterfallSync',
          description: 'Transform the webpack config, with the help of webpack-merge',
          link: 'README.md#webpackConfig',
          parent: 'initWebpack',
          after: 'webpack'
        }, {
          name: 'initWebpack',
          description: 'Create a webpack config',
          command: 'build',
          link: 'README.md#initwebpack'
        }]
      };
    }
  },
  initWebpack
};
