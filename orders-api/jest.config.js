module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.js'],
  testTimeout: 120000,
  setupFiles: ['<rootDir>/test/setupEnv.js'],
  transform: {
    '^.+\\.(js|mjs)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@pact-foundation|https-proxy-agent|agent-base|axios)/)',
  ],
};
