module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.js'],
  testTimeout: 30000,
  transform: {
    '^.+\\.(js|mjs)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@pact-foundation|https-proxy-agent|agent-base|axios)/)',
  ],
};
