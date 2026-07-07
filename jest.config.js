module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/backend', '<rootDir>/kode-agent', '<rootDir>/packages'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: ['**/*.ts', '!**/*.d.ts', '!**/node_modules/**', '!**/dist/**'],
  coverageThreshold: {global: {branches: 80, functions: 80, lines: 80, statements: 80}}
};
