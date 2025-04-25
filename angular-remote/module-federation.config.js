const { shareAll } = require('@angular-architects/module-federation/webpack');

module.exports = {
  name: 'angular_remote',
  filename: 'remoteEntry.js',
  exposes: {
    './MyElement': './src/bootstrap.ts',
  },
  shared: shareAll({
    singleton: true,
    strictVersion: true,
    requiredVersion: 'auto',
  }),
};
