
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  transform: {
    '/\\.ts$/': ['ts-jest', {
      isolatedModules: true
    }]
  },
  testPathIgnorePatterns: [
    // 'src/',
    'build/',
  ],
  reporters: [
    "default",
    [
      "jest-junit",
      {
        suiteName: "jest tests"
      }
    ]
  ]
};