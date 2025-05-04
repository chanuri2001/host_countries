module.exports = {
    testTimeout: 30000,
    testEnvironment: 'node',
    roots: ['<rootDir>'],
    testMatch: [
      '**/tests/**/*.js',
      '**/integration/**/*.js',
      '**/?(*.)+(spec|test|integration).js'
    ],
    testPathIgnorePatterns: [
      '/node_modules/'
    ]
  };