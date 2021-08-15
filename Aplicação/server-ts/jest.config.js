module.exports = {
  roots:['<rootDir>/tests'],
  collectCoverageFrom:['<rootDir>/tests/**/*.ts'],
  coverageDirectory: "coverage",
  testEnvironment:'node',
  preset: 'ts-jest',
  transform: {
    '.+\\.ts$':'ts-jest'
  }

};