const baseConfig = require('../../.eslintrc')

module.exports = {
  ...baseConfig,
  env: {
    ...baseConfig.env,
    browser: true,
  },
  extends: [
    'plugin:react/recommended',
    ...baseConfig.extends,
  ],
  plugins: [
    ...baseConfig.plugins,
    'react',
  ],
  settings: {
    ...baseConfig.settings,
    react: { version: 'detect' },
  },
}
