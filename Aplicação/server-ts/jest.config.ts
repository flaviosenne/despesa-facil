export default {
  roots: ['<rootDir>/tests'],
  clearMocks: true,
  collectCoverageFrom: ['<rootDir>/tests/**/*.ts'],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "node",
  transform:{
    '.+\\.ts$':'ts-jest'
  }

};