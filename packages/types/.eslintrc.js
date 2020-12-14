const baseConfig = require('../../.eslintrc')

module.exports = {
  ...baseConfig,
  env: {
    ...baseConfig.env,
    node: true,
  },
}
