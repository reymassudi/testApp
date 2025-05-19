module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.svg$': 'jest-transform-stub', // یا svgrMock.js
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    '\\.(png|jpg|jpeg|gif|webp|avif)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.svg$': '<rootDir>/__mocks__/svgrMock.js',
    '^next/image$': '<rootDir>/__mocks__/next/image.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
